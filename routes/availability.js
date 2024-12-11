// be/routes/availability.js
const express = require('express');
const authenticate = require('../middlewares/authenticate');
const roleAuthorization = require('../middlewares/roleAuth');
const validate = require('../middlewares/validate');
const { availabilitySchema } = require('../Validation/availbility');
const { addSlots: addAvailability, getSlots: getAvailability } = require('../controllers/availbilityController');

const router = express.Router();

router.post("/",authenticate,roleAuthorization(["professor"]),validate(availabilitySchema),addAvailability);

router.get("/:professorId", authenticate, roleAuthorization(["student"]), getAvailability);

module.exports = router;
