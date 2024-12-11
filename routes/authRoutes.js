// be/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/register', register);
router.post('/login',login);

module.exports = router;
