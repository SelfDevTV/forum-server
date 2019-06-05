const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  subForum: { type: mongoose.Schema.Types.ObjectId, ref: 'Subforum' },
  body: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  likes: Number
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
