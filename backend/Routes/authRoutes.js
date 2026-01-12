const express = require('express');
const router = express.Router();
// Use curly braces to pull the functions out of the controller
const { register, login } = require('../controllers/authController');

// Ensure these are NOT undefined
router.post('/register', register);
router.post('/login', login);

module.exports = router;