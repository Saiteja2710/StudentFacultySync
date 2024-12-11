const express = require('express');
const dotenv = require('dotenv');
const connectDB  = require('../be/config/db');
const authRoutes = require('../be/routes/authRoutes');
const availabilityRoutes = require('../be/routes/availability');
const appointmentRoutes = require('../be/routes/appointmentroutes');
const userRoutes = require('../be/routes/userRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
