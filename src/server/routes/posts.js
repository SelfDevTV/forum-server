const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const Post = require('../model/Post');
const Subforum = require('../model/SubForum');
const User = require('../model/User');

// This is a protected route with the "isAuthenticated" middleware

// TODO: save it into the user's posts array
router.post('/new', isAuthenticated, async (req, res) => {
  console.log(req.body.subForumId);
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    user: req.userId,
    subForum: req.body.subForumId
  });
  try {
    const savedPost = await post.save();
    const subForum = await Subforum.findById(req.body.subForumId);
    subForum.posts.push(savedPost.id);
    subForum.lastPost = savedPost.id;

    await subForum.save();
    const user = await User.findById(req.userId);
    user.posts.push(savedPost.id);
    await user.save();

    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

// TODO: Posts by subForum Id.

router.get('/myposts', isAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId });
    res.send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
