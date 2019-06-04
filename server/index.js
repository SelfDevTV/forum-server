const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const server = next({ dev, dir: "./client" });

const handle = server.getRequestHandler();

server.prepare().then(() => {
  dotenv.config();

  // instantiate express
  const app = express();

  // app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  // create session
  app.use(
    session({ secret: "hello world", saveUninitialized: true, resave: true })
  );

  // Middleware
  app.use(express.json()); // this is for parsing the body (req.body)

  // Passport

  app.use(passport.initialize());
  app.use(passport.session());
  require("./config/passport")(passport);

  // Import Routes
  const userRoute = require("./routes/user");
  const postRoute = require("./routes/posts");
  const forumRoute = require("./routes/forums");
  const replyRoute = require("./routes/replies");
  const authRoute = require("./routes/auth");
  const playgroundRoute = require("./routes/playground");

  // Route middlewares
  app.use("/api/user", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/forums", forumRoute);
  app.use("/api/replies", replyRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/playground", playgroundRoute);

  // SSR Route
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  // Connect to DB
  mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useCreateIndex: true },
    () => console.log("connected DB")
  );

  app.listen(3000, () => console.log("Server is listening on Port ", 3000));
});
