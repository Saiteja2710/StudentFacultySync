// be/validation/availability.js
const Joi = require('joi');

const availabilitySchema = Joi.object({
    date: Joi.string().required(),
    time_slots: Joi.array().items().min(1).required(),
});

module.exports = { availabilitySchema };
