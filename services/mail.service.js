const nodemailer = require('nodemailer');
const { logger } = require('../utils/logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmailAlert = async (device, temperature) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_FROM,
      subject: `🚨 Temperature Alert: ${device.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #d9534f;">🔥 Temperature Alert</h2>
            <p><strong>Device:</strong> ${device.name}</p>
            <p><strong>Location:</strong> ${device.location}</p>
            <p><strong>Current Temperature:</strong> <span style="color: #d9534f; font-weight: bold;">${temperature}°C</span></p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <hr />
            <p style="font-size: 0.9em; color: #777;">This is an automated alert from your IoT temperature monitoring system.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Email alert sent for device ${device.deviceId}`);
  } catch (error) {
    logger.error('Error sending email alert:', error);
  }
};

module.exports = { sendEmailAlert }; 