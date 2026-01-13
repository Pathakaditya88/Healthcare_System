const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// 1. Load environment variables
dotenv.config();

// 2. Import Route Files
const authRoutes = require('./Routes/authRoutes');
const appointmentRoutes = require('./Routes/appointmentRoutes');
const metricRoutes = require('./Routes/metricRoutes'); // Ensure this file exists

const app = express();

// 3. Global Middleware
app.use(cors()); // Allows your React frontend to talk to this API
app.use(express.json()); // Allows the server to parse JSON data in request bodies

// 4. Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/metrics', metricRoutes);

// 5. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Healthcare Database'))
  .catch((err) => console.error('❌ Could not connect to MongoDB:', err));

// 6. Basic Health Check Route
app.get('/', (req, res) => {
  res.send('Healthcare Backend API is running...');
});

// 7. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});