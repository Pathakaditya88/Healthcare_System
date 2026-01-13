const express = require('express');
const router = express.Router();
// Ensure the path to authController is correct
const { register, login } = require('../controllers/authController'); 

// Check these lines - if 'register' or 'login' is undefined, it crashes here
router.post('/register', register); 
router.post('/login', login);

module.exports = router;
console.log("Register Function:", register);
console.log("Login Function:", login);