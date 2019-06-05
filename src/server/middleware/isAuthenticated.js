module.exports = (req, res, next) => {
  const { user } = req;
  if (!user) return res.status(401).send('Access denied');

  return next();
};
