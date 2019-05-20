const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const Post = require("../model/Post");

// This is a protected route with the "verify" middleware

router.post("/new", verify, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    user: req.userId
  });
  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/myposts", verify, async (req, res) => {
  Post.find({ user: req.userId }, (err, docs) => {
    if (err) return res.status(400).send(err);
    res.send(docs);
  });
});

module.exports = router;
