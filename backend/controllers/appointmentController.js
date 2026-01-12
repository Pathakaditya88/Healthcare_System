const Appointment = require('../models/Appointment');

const getMyAppointments = async (req, res) => {
    try {
        // req.user.id will come from our Auth Middleware (which we'll build next)
        const appointments = await Appointment.find({ patient: req.user.id });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
};