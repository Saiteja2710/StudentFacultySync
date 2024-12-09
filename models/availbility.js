// be/models/Availability.js

const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String, // Use "YYYY-MM-DD" format
        required: true,
    },
    time_slots: {
        type: [String], // Array of time slots in "HH:mm" format
        validate: {
            validator: (v) => Array.isArray(v) && v.length > 0,
            message: "Time slots should be a non-empty array.",
        },
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Availability", availabilitySchema);
