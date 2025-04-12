const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline'
  },
  settings: {
    temperatureThreshold: {
      min: {
        type: Number,
        default: 15
      },
      max: {
        type: Number,
        default: 30
      }
    },
    humidityThreshold: {
      min: {
        type: Number,
        default: 30
      },
      max: {
        type: Number,
        default: 70
      }
    }
  }
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device; 