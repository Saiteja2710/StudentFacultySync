// be/controllers/authController.js
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const bcrypt = require('bcrypt')

exports.register = async(req, res) => {
    // Registration logic h ere
    const { name, email, password, role } = req.body;

        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hash, role });

        console.log("User successfully created:", newUser);

    res.status(201).json({ message: "Signup successful." });
};

exports.login = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
};
