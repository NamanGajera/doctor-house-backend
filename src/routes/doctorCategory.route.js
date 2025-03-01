const express = require('express');
const router = express.Router();
const doctorCategoryController = require('../controllers/doctorCategory.controller');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/doc-category',protect,doctorCategoryController.getCategory)

module.exports = router;

