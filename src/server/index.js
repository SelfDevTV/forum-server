const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

dotenv.config();

// instantiate express
const app = express();

app.use(cors());

// create session
app.use(session({ secret: 'hello world', saveUninitialized: true, resave: false }));

// Middleware
app.use(express.json()); // this is for parsing the body (req.body)

// Passport

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// For Build
app.use(express.static('dist'));

// Import Routes
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');
const forumRoute = require('./routes/forums');
const replyRoute = require('./routes/replies');
const authRoute = require('./routes/auth');
const playgroundRoute = require('./routes/playground');

// Route middlewares
app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/forums', forumRoute);
app.use('/api/replies', replyRoute);
app.use('/api/auth', authRoute);
app.use('/api/playground', playgroundRoute);

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useCreateIndex: true }, () => console.log('connected DB'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
