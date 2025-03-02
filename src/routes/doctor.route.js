const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const {protect,authorize} = require('../middlewares/authMiddleware');


router.get('/top-doctor',protect,doctorController.getTopDoctors);


module.exports = router;