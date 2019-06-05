const mongoose = require('mongoose');

// A post reply always belongs to a post and to a user
const replySchema = new mongoose.Schema({
  text: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
