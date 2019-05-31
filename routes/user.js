const router = require("express").Router();

router.get("/me", async (req, res) => {
  const { user } = req;

  if (user) res.send(user);

  res.send("Not logged in");
});

module.exports = router;
