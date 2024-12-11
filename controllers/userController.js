// be/controllers/userController.js
const User = require('../models/users');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Error fetching user profile.", error: err.message });
    }
};

module.exports = { getUserProfile };
