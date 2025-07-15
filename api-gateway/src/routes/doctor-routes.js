const express = require("express");
const router = express.Router();
const { DoctorController } = require("../controllers");
const authenticate = require("../middlewares/auth-middleware");

router.get("/", authenticate, DoctorController.getAllDoctor);

router.post("/like/:doctorId", authenticate, DoctorController.toggleLike);

router.get("/liked", authenticate, DoctorController.getAllLikedDoctor);

router.get("/:id", authenticate, DoctorController.getDoctor);

module.exports = router;
