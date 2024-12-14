// be/routes/appointmentroutes.js
const express = require('express');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const roleAuthorization = require('../middlewares/roleAuth');
const { appointmentSchema } = require('../Validation/appointment');
const {bookAppointment,cancelAppointment,getAppointments,}
                     = require('../controllers/appointmentController');

const router = express.Router();

router.post("/addappointment",authenticate, roleAuthorization(["student"]),validate(appointmentSchema),bookAppointment);

router.delete("/:appointmentId",authenticate,roleAuthorization(["professor"]),cancelAppointment);

router.get("/", authenticate, getAppointments);

module.exports = router;
