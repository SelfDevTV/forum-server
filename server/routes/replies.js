const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Post = require("../model/Post");
const Reply = require("../model/Reply");
const User = require("../model/User");

// This is a protected route with the "isAuthenticated" middleware

router.post("/new", isAuthenticated, async (req, res) => {
  const reply = new Reply({
    text: req.body.text,
    user: req.userId,
    post: req.body.postId
  });
  // TODO: Find the post and user who posted it
  // Save the new Reply into the Users replies array
  // also save the reply in the corresponding post
  try {
    console.log("hiho");
    await reply.save();
    const user = await User.findById(req.userId);
    user.replies.push(reply._id);
    await user.save();

    // TODO: Implement these below
    const post = await Post.findById(req.body.postId);
    post.replies.push(post._id);
    await post.save();

    console.log("this is the current reply", reply);
    res.send(reply);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/myreplies", isAuthenticated, async (req, res) => {
  try {
    const replies = await Reply.find({ user: req.userId });
    console.log(replies);
    res.send(replies);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
