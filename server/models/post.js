const mongoose = require('mongoose');
const User = require('./user');
const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: User,
    index: true,
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true, default: () => new Date() },
});

module.exports = mongoose.model('posts', postSchema);
