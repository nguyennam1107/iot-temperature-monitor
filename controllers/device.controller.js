const Device = require('../models/Device');
const Reading = require('../models/Reading');
const Alert = require('../models/Alert');
const { logger } = require('../utils/logger');

// Get all devices
exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    logger.error('Error fetching devices:', error);
    res.status(500).json({ message: 'Error fetching devices' });
  }
};

// Get device by ID
exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findOne({ deviceId: req.params.deviceId });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.json(device);
  } catch (error) {
    logger.error('Error fetching device:', error);
    res.status(500).json({ message: 'Error fetching device' });
  }
};

// Create new device
exports.createDevice = async (req, res) => {
  try {
    const { deviceId, name, location } = req.body;

    // Check if device already exists
    const existingDevice = await Device.findOne({ deviceId });
    if (existingDevice) {
      return res.status(400).json({ message: 'Device already exists' });
    }

    const device = new Device({
      deviceId,
      name,
      location
    });

    await device.save();
    res.status(201).json(device);
  } catch (error) {
    logger.error('Error creating device:', error);
    res.status(500).json({ message: 'Error creating device' });
  }
};

// Update device
exports.updateDevice = async (req, res) => {
  try {
    const { name, location, settings } = req.body;
    const device = await Device.findOneAndUpdate(
      { deviceId: req.params.deviceId },
      { 
        $set: { 
          name,
          location,
          settings
        }
      },
      { new: true }
    );

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.json(device);
  } catch (error) {
    logger.error('Error updating device:', error);
    res.status(500).json({ message: 'Error updating device' });
  }
};

// Delete device
exports.deleteDevice = async (req, res) => {
  try {
    const device = await Device.findOneAndDelete({ deviceId: req.params.deviceId });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Delete associated readings and alerts
    await Reading.deleteMany({ deviceId: req.params.deviceId });
    await Alert.deleteMany({ deviceId: req.params.deviceId });

    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    logger.error('Error deleting device:', error);
    res.status(500).json({ message: 'Error deleting device' });
  }
};

// Get device readings
exports.getDeviceReadings = async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = { deviceId: req.params.deviceId };

    if (start || end) {
      query.timestamp = {};
      if (start) query.timestamp.$gte = new Date(start);
      if (end) query.timestamp.$lte = new Date(end);
    }

    const readings = await Reading.find(query).sort({ timestamp: -1 });
    res.json(readings);
  } catch (error) {
    logger.error('Error fetching device readings:', error);
    res.status(500).json({ message: 'Error fetching device readings' });
  }
};

// Get device alerts
exports.getDeviceAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ 
      deviceId: req.params.deviceId 
    }).sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    logger.error('Error fetching device alerts:', error);
    res.status(500).json({ message: 'Error fetching device alerts' });
  }
}; 