const yup = require('yup');

// Device data validation
const deviceSchema = yup.object().shape({
  deviceId: yup.string().required(),
  temperature: yup.number().required(),
  humidity: yup.number().required()
});

// User data validation
const userSchema = yup.object().shape({
  username: yup.string().required().min(3).max(30),
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
});

// Password change validation
const passwordChangeSchema = yup.object().shape({
  currentPassword: yup.string().required(),
  newPassword: yup.string().required().min(6)
});

const validateDeviceData = async (req, res, next) => {
  try {
    await deviceSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateUserData = async (req, res, next) => {
  try {
    if (req.path.includes('change-password')) {
      await passwordChangeSchema.validate(req.body);
    } else {
      await userSchema.validate(req.body);
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  validateDeviceData,
  validateUserData
}; 