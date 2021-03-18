const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
  },
  credits: {
    type: Number,
    default: 0,
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
