const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Post = require("../model/Post");

// This is a protected route with the "verifyToken" middleware

//TODO: save it into the user's posts array
router.post("/new", verifyToken, async (req, res) => {
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

router.get("/myposts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId });
    res.send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
