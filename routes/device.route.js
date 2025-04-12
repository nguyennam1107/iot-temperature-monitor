const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  getDeviceReadings,
  getDeviceAlerts
} = require('../controllers/device.controller');

// Protected routes
router.use(protect);

// Device routes
router.route('/')
  .get(getAllDevices)
  .post(authorize('admin'), createDevice);

router.route('/:deviceId')
  .get(getDeviceById)
  .put(authorize('admin'), updateDevice)
  .delete(authorize('admin'), deleteDevice);

router.get('/:deviceId/readings', getDeviceReadings);
router.get('/:deviceId/alerts', getDeviceAlerts);

module.exports = router; 