const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  facebookId: {
    type: String,
    required: false,
    index: {
      unique: true
    },
    default: null
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function encrypt(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(user.password, salt);
  user.password = hashPassword;
  return next();
});

userSchema.methods.comparePassword = function compare(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
