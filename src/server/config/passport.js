const FacebookStrategy = require('passport-facebook');
const User = require('../model/User');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // facebook strategy

  passport.use(
    new FacebookStrategy(
      {
        clientID: '2216422875335326',
        clientSecret: 'aebd02b19269809a5bd8094cc582684a',
        callbackURL: '/api/auth/facebook/callback',

        profileFields: ['id', 'displayName', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        // TODO: create new user and save it to the database
        try {
          const user = await User.findOne({ facebookId: profile.id });

          if (!user) {
            const newUser = new User({
              name: profile.displayName,
              facebookId: profile.id,
              email: profile.emails[0].value
            });
            await newUser.save();
            done(null, newUser);
          }
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
