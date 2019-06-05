const User = require('../model/User');

module.exports = async (req, res, next) => {
  const { user } = req;
  if (!user) return res.status(401).send('Access denied');

  try {
    // check if the user is an admin
    try {
      const foundUser = await User.findById(user.id);
      // TODO: Implement real admin feature
      if (!foundUser.toObject().isAdmin) return res.status(401).send('No Admin');

      return next();
    } catch (err) {
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
};
