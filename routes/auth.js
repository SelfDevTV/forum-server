const router = require("express").Router();
const passport = require("passport");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createServer({});

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
  res.redirect("http://localhost:3000");
});

/* Facebook Auth */

module.exports = router;
