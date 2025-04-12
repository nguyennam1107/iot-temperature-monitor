const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    ref: 'Device'
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

module.exports = Temperature; 