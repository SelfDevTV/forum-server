const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
