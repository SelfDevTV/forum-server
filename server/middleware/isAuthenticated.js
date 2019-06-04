module.exports = function(req, res, next) {
  const { user } = req;
  if (!user) return res.redirect("/");

  next();
};
