const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// Middleware
app.use(express.json()); // this is for parsing the body (req.body)
app.use(cors());

// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const forumRoute = require("./routes/forums");
const replyRoute = require("./routes/replies");

// Route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/forums", forumRoute);
app.use("/api/replies", replyRoute);

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected DB")
);

app.listen(process.env.PORT, () =>
  console.log("Server is listening on Port ", process.env.PORT)
);
