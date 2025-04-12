const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getAlerts,
  resolveAlert,
  deleteAlert
} = require('../controllers/alert.controller');

// Protected routes
router.use(protect);

// Alert routes
router.get('/', getAlerts);
router.put('/:id/resolve', authorize('admin'), resolveAlert);
router.delete('/:id', authorize('admin'), deleteAlert);

module.exports = router; 