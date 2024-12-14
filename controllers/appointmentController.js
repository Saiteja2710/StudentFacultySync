const Appointment = require('../models/appointment');
const Availability = require('../models/availbility');

const bookAppointment = async (req, res) => {
    try {
        const { professorId, date, time_slot } = req.body;
        const studentId = req.user._id;

        if (!time_slot) {
            return res.status(400).json({ message: "Time slot is required." });
        }

        // Check if an appointment already exists for the professor, date, and time slot
        const existingAppointment = await Appointment.findOne({
            professor_id: professorId,
            date,
            time: time_slot,
        });

        if (existingAppointment) {
            return res.status(409).json({ message: "Time slot not available. Please choose another slot." });
        }

        // Check if availability exists for the professor on the given date
        const availability = await Availability.findOne({ professor_id: professorId, date });
        if (!availability) {
            return res.status(404).json({ message: "No availability found for this professor on this date." });
        }

        // Ensure the requested time slot is still available in the availability
        if (!availability.time_slots.includes(time_slot)) {
            return res.status(409).json({ message: "Time slot not available. Please choose another slot." });
        }

        // Create the appointment
        const appointment = new Appointment({
            professor_id: professorId,
            student_id: studentId,
            date,
            time: time_slot,
        });
        await appointment.save();

        // Update availability
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

        const { professor_id, date, time } = appointment;

        // Delete appointment
        await Appointment.findByIdAndDelete(appointmentId);

        // Update availability
        const availability = await Availability.findOne({ professor_id, date });
        if (availability) {
            availability.time_slots.push(time);
            await availability.save();
        }

        res.json({ message: "Appointment canceled successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error canceling appointment.", error: err.message });
    }
};

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found." });
        }

        res.json({ appointments });
    } catch (err) {
        res.status(500).json({ message: "Error fetching appointments.", error: err.message });
    }
};


module.exports = { bookAppointment, cancelAppointment, getAppointments };
