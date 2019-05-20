const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const Forum = require("../model/Forum");
const SubForum = require("../model/SubForum");

router.post("/new", verify, async (req, res) => {
  // TODO: Only admin can do this
  const forum = new Forum({
    title: req.body.title,
    subTitle: req.body.subTitle
  });

  try {
    await forum.save();
    res.send(forum);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/newSub", verify, async (req, res) => {
  // TODO: Only admin can do this
  const subForum = new SubForum({
    title: req.body.title,
    subTitle: req.body.subTitle,
    forum: req.body.forum
  });

  try {
    await subForum.save();
    const forum = await Forum.findById(req.body.forum);

    forum.subForums.push(subForum._id);
    await forum.save();

    res.send(subForum);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/all", verify, async (req, res) => {
  const all = await Forum.find({}).populate("subForums");
  res.send(all);
});

// Gets the forum by id and all its subs
router.get("/:id", verify, async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id).populate("subForums");
    res.send(forum);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
