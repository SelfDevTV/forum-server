const router = require("express").Router();
const verify = require("../middleware/verifyToken");

// This is a protected route with the "verify" middleware

router.get("/", verify, (req, res) => {
  res.json({ posts: { title: "my first post", description: "random data" } });
});

module.exports = router;
