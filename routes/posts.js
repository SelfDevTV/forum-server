const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Post = require("../model/Post");
const Subforum = require("../model/SubForum");

// This is a protected route with the "verifyToken" middleware

//TODO: save it into the user's posts array
router.post("/new", verifyToken, async (req, res) => {
  console.log(req.body.subForumId);
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    user: req.userId,
    subForum: req.body.subForumId
  });
  try {
    const savedPost = await post.save();
    console.log(savedPost);
    const subForum = await Subforum.findById(req.body.subForumId);
    subForum.posts.push(savedPost._id);
    subForum.lastPost = savedPost._id;

    await subForum.save();

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
