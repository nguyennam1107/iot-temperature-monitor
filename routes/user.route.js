const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateUserData } = require('../middleware/validate.middleware');

// Public routes
router.post('/register', validateUserData, userController.register);
router.post('/login', validateUserData, userController.login);

// Protected routes
router.use(authenticate);
router.get('/profile', userController.getProfile);
router.put('/profile', validateUserData, userController.updateProfile);
router.put('/change-password', validateUserData, userController.changePassword);

module.exports = router; 