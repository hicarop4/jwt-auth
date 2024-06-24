import express, { NextFunction } from "express";
const router = express.Router();
import verifyToken from "../middlewares/verifyToken";
import { User, getUsers } from "../models/User";
import multer, { MulterError } from "multer";
import config from "../config/multer";

// types
import { Request, Response } from "express";

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const uid = req.params.id;
  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).send("User not found!");
    }
    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/", async (req: Request, res: Response) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  if (authHeader !== process.env.ADMIN_TOKEN) {
    res.status(401).send("You don't have permission to delete all users.");
  }
  try {
    await User.deleteMany({});
    return res.status(200).send("All users were deleted!");
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const users = await getUsers();
  if (!users) {
    return res.status(404).send("There's no user in database!");
  }
  return res.send(users);
});

const handleAvatarController = async (req: Request, res: Response) => {
  if (!req.file) {
    return res
      .status(400)
      .send(
        "You need to send a file within extensions png, jpg, bjpeg or gif."
      );
  }
  const userPayload = String(res.getHeader("user"));
  if (!userPayload)
    return res
      .status(400)
      .send("You need to be authenticated to update your avatar profile.");
  // updates avatar profile with the URL of the uploaded image
  try {
    const _id = JSON.parse(userPayload)["_id"];
    const user = await User.findOne({ _id });
    if (!user) return res.status(404).send("User not found.");
    // saves avatar url to avatar field in mongoDB
    user.avatar = req.file.path || (req.file as Express.MulterS3.File).location;
    user.save();
  } catch (error) {
    return res.status(400).send("Authentication failed.");
  }

  res.status(200).send("Avatar was saved with success.");
};

const uploadSingleAvatar = multer(config).single("avatar");
router.post("/avatar", verifyToken, async (req: Request, res: Response) => {
  uploadSingleAvatar(req, res, (err) => {
    if (err) {
      return res.status(400).send("File is too large. Limit: 1MB");
    }
    return handleAvatarController(req, res);
  });
});

export default router;
