// be/validation/appointment.js - related appointment schema

const Joi = require('joi');

const appointmentSchema = Joi.object({
    professorId: Joi.string().required(),
    date: Joi.string().required(),
    time_slot: Joi.string().required(),
});

module.exports = { appointmentSchema };
