const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

dotenv.config();

// instantiate express
const app = express();

// create session
app.use(
  session({ secret: "hello world", resave: false, saveUninitialized: false })
);

// Passport
require("./config/passport")(passport);
app.use(passport.initialize());

// Middleware
app.use(express.json()); // this is for parsing the body (req.body)
app.use(cors());

// Import Routes
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const forumRoute = require("./routes/forums");
const replyRoute = require("./routes/replies");
const authRoute = require("./routes/auth");

// Route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/forums", forumRoute);
app.use("/api/replies", replyRoute);
app.use("/api/auth", authRoute);

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected DB")
);

app.listen(process.env.PORT, () =>
  console.log("Server is listening on Port ", process.env.PORT)
);
