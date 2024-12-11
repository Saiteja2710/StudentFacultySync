const Availability = require('../models/availbility');

const addSlots = async (req, res) => {
    try {
        const { date, time_slots } = req.body;
        const professorId = req.user.id;

        const slots = await Availability.create({ professorId, date, time_slots });
        res.status(201).json({ message: "Slots added.", slots });
    } catch (err) {
        res.status(500).json({ message: "Failed to add slots.", error: err.message });
    }
};

const getSlots = async (req, res) => {
    try {
        const { professorId } = req.params;
        const slots = await Availability.find({ professorId });
        res.json({ slots });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch slots.", error: err.message });
    }
};

module.exports = { addSlots, getSlots };
