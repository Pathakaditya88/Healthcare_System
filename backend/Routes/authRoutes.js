const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Routes matching your original API structure
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;