// be/controllers/appointmentController.js
const Appointment = require('../models/appointment');
const Availability = require('../models/availbility');

const bookAppointment = async (req, res) => {
    try {
        const { professorId, date, time_slot } = req.body;
        const studentId = req.user.id;

        // Check if time slot is available
        const availability = await Availability.findOne({ professorId, date });
        if (!availability || !availability.time_slots.includes(time_slot)) {
            return res.status(400).json({ message: "Time slot not available." });
        }

        // Create appointment
        const appointment = new Appointment({ professorId, studentId, date, time_slot });
        await appointment.save();

        // Remove booked time slot from availability
        availability.time_slots = availability.time_slots.filter((slot) => slot !== time_slot);
        await availability.save();

        res.status(201).json({ message: "Appointment booked successfully.", appointment });
    } catch (err) {
        res.status(500).json({ message: "Error booking appointment.", error: err.message });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        const { professorId, date, time_slot } = appointment;

        // Delete appointment
        await Appointment.findByIdAndDelete(appointmentId);

        // Add canceled time slot back to availability
        const availability = await Availability.findOne({ professorId, date });
        if (availability) {
            availability.time_slots.push(time_slot);
            await availability.save();
        }

        res.json({ message: "Appointment canceled successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error canceling appointment.", error: err.message });
    }
};

const getAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;

        let appointments;
        if (role === "professor") {
            appointments = await Appointment.find({ professorId: userId });
        } else if (role === "student") {
            appointments = await Appointment.find({ studentId: userId });
        }

        res.json({ appointments });
    } catch (err) {
        res.status(500).json({ message: "Error fetching appointments.", error: err.message });
    }
};

module.exports = { bookAppointment, cancelAppointment, getAppointments };
