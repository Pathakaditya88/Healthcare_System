const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();
const cors = require('cors');
const app = express();
app.use(cors()); // Put this before your routes!
app.use(express.json()); // Allows the server to understand JSON data
// Add this line after app.use(express.json()):
const authRoutes = require('./Routes/authRoutes');
// ... after authRoutes import
const metricRoutes = require('./routes/metricRoutes')
app.use('/api/auth', authRoutes); 
// ... after app.use('/api/auth', authRoutes);
app.use('/api/metrics', metricRoutes);
// 1. Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Healthcare Database'))
  .catch((err) => console.error('❌ Could not connect to MongoDB:', err));

// 2. Basic Test Route (Replacing your @app.get("/") in api.py)
app.get('/', (req, res) => {
  res.send('Healthcare Backend API is running...');
});

// 3. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
// ... existing imports ...


// ... existing middleware ...


// ... existing mongoose connection ...


