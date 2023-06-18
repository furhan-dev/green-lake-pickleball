const mongoose = require('mongoose');
const User = require('./user');
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: User,
    required: true,
  },
  modifiedBy: {
    type: mongoose.Types.ObjectId,
    ref: User,
  },
  notes: { type: String },
});

module.exports = mongoose.model('events', eventSchema);
