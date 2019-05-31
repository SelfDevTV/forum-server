const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async function(req, res, next) {
  const { user } = req;
  if (!user) return res.status(401).send("Access denied");

  try {
    // check if the user is an admin
    try {
      const user = await User.findById(user.id);
      // TODO: Implement real admin feature
      if (!user.toObject().isAdmin) return res.status(401).send("No Admin");

      next();
    } catch (err) {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
