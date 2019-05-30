const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../utils/validation");

router.post("/register", async (req, res) => {
  // Validate the data before we save it
  console.log("hi from register");
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user is already in database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("email already exists");

  // Hash the password

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    // Save User
    await user.save();
    // create and assign a JWT Token
    const token = jwt.sign(
      { _id: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).send({ user: user._id, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  // Validate data before login
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist");

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // create and assign a JWT Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

// Me (refreshes the token and send it back with the user)

router.get("/me", async (req, res) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // look if we can find user
    try {
      const user = await User.findById(verified._id);
      const newToken = jwt.sign(
        { _id: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
        process.env.TOKEN_SECRET
      );
      res.send({ token: newToken, user });
    } catch (err) {
      res.status(401).send("Access denied");
    }
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
});

module.exports = router;
