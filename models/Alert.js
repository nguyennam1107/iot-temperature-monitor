const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    ref: 'Device'
  },
  type: {
    type: String,
    required: true,
    enum: ['high', 'low', 'offline']
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: {
    type: Date
  }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert; 