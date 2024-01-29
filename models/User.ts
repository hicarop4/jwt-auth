import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

// controllers
const getUsers = async () => {
  try {
    const users = await User.find({}).select("name email date -_id");
    return users;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  User,
  getUsers,
};
