const mongoose = require('mongoose')

const Availability = require('../models/availbility');

const addSlots = async (req, res) => {
    try {
        const { date, time_slots } = req.body;
        const professor_id = req.user._id;
        
        console.log("before");
        const slots = await Availability.create({
            professor_id: professor_id,
            date,
            time_slots,
        });
        console.log("after");

        res.status(201).json({ message: "Slots added.", slots });
    } catch (err) {
        res.status(500).json({ message: "Failed to add slots.", error: err.message });
    }
};

const getSlots = async (req, res) => {
    try {
        const { professorId } = req.params;
        const slots = await Availability.find({ professor_id: professorId }).select('date time_slots');
        const formattedSlots = slots.map(slot => ({
            date: slot.date,
            time_slots: slot.time_slots
        }));
        res.json(formattedSlots);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch slots.", error: err.message });
    }
};

module.exports = { addSlots, getSlots };
