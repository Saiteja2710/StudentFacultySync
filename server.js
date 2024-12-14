const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const availabilityRoutes = require('./routes/availability');

const appointmentRoutes = require('./routes/appointmentroutes');

dotenv.config(); // Load environment variables

const app = express();
connectDB();

app.use(express.json()); // Middleware for handling JSON data

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use('/',(req,res)=>{
  res.send("Hello world");
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);
