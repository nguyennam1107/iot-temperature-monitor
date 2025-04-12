const Device = require('../models/device.model');
const { sendEmailAlert } = require('../services/mail.service');
const { sendDiscordAlert } = require('../services/discord.service');
const { logger } = require('../utils/logger');

const deviceController = {
  // Create new device
  createDevice: async (req, res) => {
    try {
      const device = new Device({
        ...req.body,
        owner: req.user._id
      });
      await device.save();
      res.status(201).json(device);
    } catch (error) {
      logger.error('Error creating device:', error);
      res.status(400).json({ message: error.message });
    }
  },

  // Update device data from ESP32
  updateDeviceData: async (req, res) => {
    try {
      const { deviceId, temperature, humidity } = req.body;
      const device = await Device.findOne({ deviceId });

      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      // Check temperature thresholds
      if (temperature < process.env.MIN_TEMPERATURE || temperature > process.env.MAX_TEMPERATURE) {
        device.status = 'warning';
        // Send alerts
        await sendEmailAlert(device, temperature);
        await sendDiscordAlert(device, temperature);
      } else {
        device.status = 'active';
      }

      device.temperature = temperature;
      device.humidity = humidity;
      device.lastUpdated = new Date();

      await device.save();
      res.json(device);
    } catch (error) {
      logger.error('Error updating device data:', error);
      res.status(400).json({ message: error.message });
    }
  },

  // Get all devices for a user
  getUserDevices: async (req, res) => {
    try {
      const devices = await Device.find({ owner: req.user._id });
      res.json(devices);
    } catch (error) {
      logger.error('Error getting user devices:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get device by ID
  getDeviceById: async (req, res) => {
    try {
      const device = await Device.findOne({
        _id: req.params.id,
        owner: req.user._id
      });

      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      res.json(device);
    } catch (error) {
      logger.error('Error getting device:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = deviceController; 