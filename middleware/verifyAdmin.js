const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.userId = verified._id;
    // check if the user is an admin
    try {
      const user = await User.findById(verified._id);
      if (!user.isAdmin) return res.status(401).send("No Admin");

      next();
    } catch (err) {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
