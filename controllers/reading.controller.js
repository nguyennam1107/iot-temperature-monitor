const Reading = require('../models/Reading');
const Device = require('../models/Device');
const Alert = require('../models/Alert');
const { logger } = require('../utils/logger');

// Create new reading
exports.createReading = async (req, res) => {
  try {
    const { deviceId, temperature, humidity } = req.body;

    // Check if device exists
    const device = await Device.findOne({ deviceId });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Create reading
    const reading = new Reading({
      deviceId,
      temperature,
      humidity
    });

    await reading.save();

    // Update device last seen
    device.lastSeen = new Date();
    device.status = 'online';
    await device.save();

    // Check thresholds and create alerts if needed
    const { temperatureThreshold, humidityThreshold } = device.settings;

    if (temperature < temperatureThreshold.min) {
      await createAlert(deviceId, 'low', temperature, 'temperature');
    } else if (temperature > temperatureThreshold.max) {
      await createAlert(deviceId, 'high', temperature, 'temperature');
    }

    if (humidity < humidityThreshold.min) {
      await createAlert(deviceId, 'low', humidity, 'humidity');
    } else if (humidity > humidityThreshold.max) {
      await createAlert(deviceId, 'high', humidity, 'humidity');
    }

    res.status(201).json(reading);
  } catch (error) {
    logger.error('Error creating reading:', error);
    res.status(500).json({ message: 'Error creating reading' });
  }
};

// Get readings with pagination and filters
exports.getReadings = async (req, res) => {
  try {
    const { deviceId, start, end, limit = 100, page = 1 } = req.query;
    const query = {};

    if (deviceId) query.deviceId = deviceId;
    if (start || end) {
      query.timestamp = {};
      if (start) query.timestamp.$gte = new Date(start);
      if (end) query.timestamp.$lte = new Date(end);
    }

    const total = await Reading.countDocuments(query);
    const readings = await Reading.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      readings,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching readings:', error);
    res.status(500).json({ message: 'Error fetching readings' });
  }
};

// Helper function to create alerts
async function createAlert(deviceId, type, value, metric) {
  try {
    const alert = new Alert({
      deviceId,
      type,
      value,
      message: `${metric.charAt(0).toUpperCase() + metric.slice(1)} ${type} alert: ${value}`
    });
    await alert.save();
  } catch (error) {
    logger.error('Error creating alert:', error);
  }
} 