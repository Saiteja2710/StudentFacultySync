// be/models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String, // Use "YYYY-MM-DD" format
        required: true,
        validate: {
            validator: function (value) {
                return /^\d{4}-\d{2}-\d{2}$/.test(value);
            },
            message: "Date must be in the format YYYY-MM-DD",
        },
    },
    time: {
        type: String, // Use "HH:mm" format
        required: true,
        validate: {
            validator: function (value) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
            },
            message: "Time must be in the format HH:mm",
        },
    },
    status: {
        type: String,
        enum: ["booked", "canceled"],
        default: "booked",
    },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
