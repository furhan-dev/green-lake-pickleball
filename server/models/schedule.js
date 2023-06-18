const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  event: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('schedule', scheduleSchema);
