const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospital.controller');
const {protect,authorize} = require('../middlewares/authMiddleware');


router.get('/top-hospital',protect,hospitalController.getTopHospitals);

module.exports = router;