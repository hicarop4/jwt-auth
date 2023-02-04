const router = require("express").Router();
const verificaToken = require("./verifyToken");
const { User, getUsers } = require("../models/User");

router.get("/me", verificaToken, async (req, res) => {
  // my user
  try {
    const me = await User.findById(req.user._id);
    if (!me) {
      return res.status(404).send("User not found!");
    }
    return res.send(me);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/list", verificaToken, async (req, res) => {
  const users = await getUsers();
  if (!users) {
    return res.status(404).send("There's no user in database!");
  }
  return res.send(users);
});

module.exports = router;
