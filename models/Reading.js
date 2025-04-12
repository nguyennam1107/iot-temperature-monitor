const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Reading = mongoose.model('Reading', readingSchema);

module.exports = Reading; 