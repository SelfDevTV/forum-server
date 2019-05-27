const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const Forum = require("../model/Forum");
const SubForum = require("../model/SubForum");

router.post("/new", verifyAdmin, async (req, res) => {
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

router.post("/newSub", verifyAdmin, async (req, res) => {
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

router.get("/all", verifyToken, async (req, res) => {
  // Populating all field we need in the frontend
  // We need: All the forums, with all subForums and for each subForum we need it's posts and last poast

  const all = await Forum.find({}).populate({
    path: "subForums",
    populate: [{ path: "lastPost" }, { path: "posts" }]
  });

  res.send(all);
});

// Gets the forum by id and all its subs
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id).populate("subForums");
    res.send(forum);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
