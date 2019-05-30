const router = require("express").Router();
const passport = require("passport");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createServer({});

router.get(
  "/facebook",

  passport.authenticate("facebook")
);

//

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000"
  })
);

module.exports = router;
