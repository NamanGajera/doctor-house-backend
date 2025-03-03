const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Change from GET to POST for fetching upcoming appointments
router.post('/upcoming-appointment', protect, appointmentController.getUpcomingAppointments);

module.exports = router;
