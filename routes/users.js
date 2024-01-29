const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const { User, getUsers } = require("../models/User");

router.get("/:id", verifyToken, async (req, res) => {
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

router.get("/", verifyToken, async (req, res) => {
  const users = await getUsers();
  if (!users) {
    return res.status(404).send("There's no user in database!");
  }
  return res.send(users);
});

module.exports = router;
