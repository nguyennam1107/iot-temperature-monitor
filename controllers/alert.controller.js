const Alert = require('../models/Alert');
const { logger } = require('../utils/logger');

// Get all alerts with filters
exports.getAlerts = async (req, res) => {
  try {
    const { deviceId, type, resolved, start, end, limit = 100, page = 1 } = req.query;
    const query = {};

    if (deviceId) query.deviceId = deviceId;
    if (type) query.type = type;
    if (resolved !== undefined) query.resolved = resolved === 'true';
    if (start || end) {
      query.timestamp = {};
      if (start) query.timestamp.$gte = new Date(start);
      if (end) query.timestamp.$lte = new Date(end);
    }

    const total = await Alert.countDocuments(query);
    const alerts = await Alert.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      alerts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching alerts:', error);
    res.status(500).json({ message: 'Error fetching alerts' });
  }
};

// Resolve alert
exports.resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    alert.resolved = true;
    alert.resolvedAt = new Date();
    await alert.save();

    res.json(alert);
  } catch (error) {
    logger.error('Error resolving alert:', error);
    res.status(500).json({ message: 'Error resolving alert' });
  }
};

// Delete alert
exports.deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.json({ message: 'Alert deleted successfully' });
  } catch (error) {
    logger.error('Error deleting alert:', error);
    res.status(500).json({ message: 'Error deleting alert' });
  }
}; 