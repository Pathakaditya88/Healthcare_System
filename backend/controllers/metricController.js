const HealthMetric = require('../models/HealthMetric');

// @desc    Add new health metric
// @route   POST /api/metrics
// @access  Private (Patient only)
exports.addMetric = async (req, res) => {
    try {
        const { type, value, unit } = req.body;

        const metric = await HealthMetric.create({
            patientId: req.user._id, // Taken from the protect middleware
            type,
            value,
            unit,
            // Logic: Is BP > 140/90 or Heart Rate > 100?
            isCritical: value.includes('/') ? parseInt(value.split('/')[0]) > 140 : parseInt(value) > 100
        });

        res.status(201).json(metric);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get metrics for logged in patient
// @route   GET /api/metrics/my-metrics
// @access  Private (Patient)
exports.getMyMetrics = async (req, res) => {
    try {
        const metrics = await HealthMetric.find({ patientId: req.user._id }).sort({ timestamp: -1 });
        res.json(metrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all metrics (Doctor only)
// @route   GET /api/metrics/all
// @access  Private (Doctor)
exports.getAllMetrics = async (req, res) => {
    try {
        const metrics = await HealthMetric.find().populate('patientId', 'name email');
        res.json(metrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};