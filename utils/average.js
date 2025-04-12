const Device = require('../models/device.model');

const calculateAverageTemperature = async (deviceId, timeRange = '24h') => {
  try {
    const now = new Date();
    let startTime;

    switch (timeRange) {
      case '1h':
        startTime = new Date(now - 60 * 60 * 1000);
        break;
      case '6h':
        startTime = new Date(now - 6 * 60 * 60 * 1000);
        break;
      case '12h':
        startTime = new Date(now - 12 * 60 * 60 * 1000);
        break;
      case '24h':
        startTime = new Date(now - 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = new Date(now - 24 * 60 * 60 * 1000);
    }

    const device = await Device.findOne({ deviceId });
    if (!device) {
      throw new Error('Device not found');
    }

    // In a real application, you would query the temperature history
    // For now, we'll just return the current temperature
    return {
      average: device.temperature,
      min: device.temperature,
      max: device.temperature,
      timeRange
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  calculateAverageTemperature
}; 