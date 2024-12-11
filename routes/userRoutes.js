// src/routes/userRoutes.js
const express = require('express');
const authenticate = require('../middlewares/authenticate');
const { getUserProfile } = require('../controllers/userController');

const router = express.Router();

router.get("/profile", authenticate, getUserProfile);

module.exports = router;
