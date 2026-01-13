const express = require('express');
const router = express.Router(); // <--- THIS LINE IS LIKELY MISSING
const { protect } = require('../middleware/authMiddleware');
const { 
    getMyAppointments, 
    bookAppointment 
} = require('../controllers/appointmentController');

// Define your routes
router.get('/my', protect, getMyAppointments);
router.post('/book', protect, bookAppointment);

// Export the router
module.exports = router;