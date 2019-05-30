const FacebookStrategy = require("passport-facebook");

module.exports = passport => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(err, user);
  });

  // facebook strategy

  passport.use(
    new FacebookStrategy(
      {
        clientID: "2216422875335326",
        clientSecret: "aebd02b19269809a5bd8094cc582684a",
        callbackURL: "/api/auth/facebook/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        //TODO: create new user and save it to the database

        done(null, { user: { name: "hubsi" } });
      }
    )
  );
};
