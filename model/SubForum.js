const mongoose = require("mongoose");

const subForumSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  forum: { type: mongoose.Schema.Types.ObjectId, ref: "Forum" }
});

const SubForum = mongoose.model("Subforum", subForumSchema);

module.exports = SubForum;
