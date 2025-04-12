const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { createReading, getReadings } = require('../controllers/reading.controller');

// Protected routes
router.use(protect);

// Reading routes
router.route('/')
  .get(getReadings)
  .post(createReading);

module.exports = router; 