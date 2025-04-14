const axios = require('axios');
const { logger } = require('../utils/logger');

const sendDiscordAlert = async (device, temperature) => {
  try {
    const message = {
      embeds: [{
        title: '🚨 Temperature Alert',
        description: `⚠️ **Device \`${device.name}\` is reporting an abnormal temperature!**`,
        color: 0xFF4500, // đỏ cam cảnh báo
        fields: [
          {
            name: '📍 Location',
            value: device.location || 'Unknown',
            inline: true
          },
          {
            name: '🌡️ Current Temperature',
            value: `\`${temperature}°C\``,
            inline: true
          },
          {
            name: '🕒 Time',
            value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
            inline: false
          }
        ],
        footer: {
          text: 'IoT Temperature Monitoring System',
          icon_url: 'https://cdn-icons-png.flaticon.com/512/481/481146.png'
        },
        timestamp: new Date().toISOString()
      }]
    };

    // Gửi request HTTP POST tới webhook URL
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
  }catch (error) {
    logger.error('Error sending Discord alert:', error);
  }
};

module.exports = { sendDiscordAlert }; 