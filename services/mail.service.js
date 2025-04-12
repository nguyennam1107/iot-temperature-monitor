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
      from: process.env.EMAIL_FROM,
      to: device.owner.email,
      subject: `Temperature Alert: ${device.name}`,
      text: `
        Alert! Temperature out of range for device ${device.name}
        Location: ${device.location}
        Current Temperature: ${temperature}°C
        Time: ${new Date().toLocaleString()}
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Email alert sent for device ${device.deviceId}`);
  } catch (error) {
    logger.error('Error sending email alert:', error);
  }
};

module.exports = { sendEmailAlert }; 