const router = require("express").Router();
const passport = require("passport");

/* Facebook Auth */

router.get(
  "/facebook",

  passport.authenticate("facebook", { scope: "email" })
);

//

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/auth/facebook/login"
  })
);

router.get("/facebook/login", (req, res) => {
  console.log(req.user);
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logged out");
});

/* Facebook Auth */

module.exports = router;
