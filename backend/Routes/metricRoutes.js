const express = require('express');
const router = express.Router();
const { addMetric, getMyMetrics, getAllMetrics } = require('../controllers/metricController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All metric routes require a login
router.use(protect);

// Patients can add and see their own metrics
router.post('/', authorize('patient'), addMetric);
router.get('/my-metrics', authorize('patient'), getMyMetrics);

// Only Doctors can see everyone's metrics
router.get('/all', authorize('doctor'), getAllMetrics);

module.exports = router;