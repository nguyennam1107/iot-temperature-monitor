const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

// Protected routes
router.use(protect);

// User routes
router.route('/')
  .get(authorize('admin'), getAllUsers);

router.route('/:id')
  .get(authorize('admin'), getUserById)
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router; 