const axios = require('axios');
const { logger } = require('../utils/logger');

const sendDiscordAlert = async (device, temperature) => {
  try {
    const message = {
      embeds: [{
        title: 'Temperature Alert',
        description: `Temperature out of range for device ${device.name}`,
        color: 0xFF0000,
        fields: [
          {
            name: 'Location',
            value: device.location,
            inline: true
          },
          {
            name: 'Current Temperature',
            value: `${temperature}°C`,
            inline: true
          },
          {
            name: 'Time',
            value: new Date().toLocaleString(),
            inline: true
          }
        ]
      }]
    };

    await axios.post(process.env.DISCORD_WEBHOOK_URL, message);
    logger.info(`Discord alert sent for device ${device.deviceId}`);
  } catch (error) {
    logger.error('Error sending Discord alert:', error);
  }
};

module.exports = { sendDiscordAlert }; 