const Joi = require("joi");

const availabilitySchema = Joi.object({
    professor_id: Joi.string().required(),
    date: Joi.string().required(),
    time_slots: Joi.array().items(Joi.string()).min(1).required(),
});

module.exports = { availabilitySchema };
