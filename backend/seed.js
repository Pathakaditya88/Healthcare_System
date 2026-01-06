const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB for seeding...');

        // Clear existing users to start fresh
        await User.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedDoctorPwd = await bcrypt.hash('doctor123', salt);
        const hashedPatientPwd = await bcrypt.hash('patient123', salt);

        await User.insertMany([
            {
                name: 'Dr. Smith',
                email: 'doctor@test.com',
                password: hashedDoctorPwd,
                role: 'doctor'
            },
            {
                name: 'John Doe',
                email: 'patient@test.com',
                password: hashedPatientPwd,
                role: 'patient'
            }
        ]);

        console.log('✅ Success: Test Doctor and Patient created!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedUsers();