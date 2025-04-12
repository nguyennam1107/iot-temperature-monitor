const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateDeviceData } = require('../middleware/validate.middleware');

// Apply authentication middleware to all routes
router.use(authenticate);

// Routes
router.post('/', deviceController.createDevice);
router.post('/update', validateDeviceData, deviceController.updateDeviceData);
router.get('/', deviceController.getUserDevices);
router.get('/:id', deviceController.getDeviceById);

module.exports = router; 