const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateUserData } = require('../middleware/validate.middleware');

// Authentication routes
router.post('/register', validateUserData, userController.register);
router.post('/login', validateUserData, userController.login);

module.exports = router; 