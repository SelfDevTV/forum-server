const router = require("express").Router();
const passport = require("passport");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createServer({});

/* Facebook Auth */

const CLIENT_URL = "http://localhost:3000";

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
  res.redirect(CLIENT_URL);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("Logged out");
});

/* Facebook Auth */

module.exports = router;
