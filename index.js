const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Middleware
app.use(express.json());

// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected DB")
);

app.listen(5000, () => console.log("Server is listening on Port 5000"));
