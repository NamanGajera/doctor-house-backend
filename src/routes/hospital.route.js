const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospital.controller");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.get("/top-hospital", protect, hospitalController.getTopHospitals);
router.get("/hospital/:id", protect, hospitalController.getHospitalById);

router.put("/like-hospital", protect, hospitalController.toggleHospitalLike);
router.get(
  "/get-liked-hospital",
  protect,
  hospitalController.getUserLikedHospital
);

module.exports = router;
