const Appointment = require('../models/Appointment');

// @desc    Get all appointments for the logged-in user
const getMyAppointments = async (req, res) => {
    try {
        // req.user.id comes from our protect middleware
        const appointments = await Appointment.find({ patient: req.user.id }).sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
};

// @desc    Book a new appointment
const bookAppointment = async (req, res) => {
    try {
        const { doctorName, date, reason } = req.body;

        const appointment = await Appointment.create({
            patient: req.user.id,
            doctorName,
            date,
            reason,
            status: 'Scheduled'
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Failed to book appointment" });
    }
};

// Export the functions simply like this:
module.exports = { 
    getMyAppointments, 
    bookAppointment 
};