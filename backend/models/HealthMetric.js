const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
 type: { 
    type: String, 
    lowercase: true, // Automatically converts "BloodPressure" to "bloodpressure"
    trim: true,      // Removes accidental spaces
    enum: ['bloodpressure', 'heartrate', 'glucose'], 
    required: true 
  },
  value: { type: String, required: true }, // String to handle "120/80"
  unit: { type: String, required: true },
  isCritical: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthMetric', healthMetricSchema);