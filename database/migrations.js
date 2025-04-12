const Device = require('../models/device.model');
const { logger } = require('../utils/logger');

const runMigrations = async () => {
  try {
    // Check if any devices exist
    const deviceCount = await Device.countDocuments();
    
    if (deviceCount === 0) {
      logger.info('No devices found. Running initial migration...');
      
      // Create sample devices
      const sampleDevices = [
        {
          deviceId: 'ESP32-001',
          name: 'Living Room Sensor',
          location: 'Living Room',
          temperature: 25,
          humidity: 50,
          status: 'active'
        },
        {
          deviceId: 'ESP32-002',
          name: 'Kitchen Sensor',
          location: 'Kitchen',
          temperature: 22,
          humidity: 45,
          status: 'active'
        }
      ];

      await Device.insertMany(sampleDevices);
      logger.info('Initial migration completed successfully');
    }
  } catch (error) {
    logger.error('Migration error:', error);
  }
};

module.exports = {
  runMigrations
}; 