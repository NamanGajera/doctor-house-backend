const express = require("express");
const router = express.Router();
const { DoctorController } = require("../controllers");
const authenticate = require("../middlewares/auth-middleware");

router.get("/", authenticate, DoctorController.getAllDoctor);
router.get("/:id", authenticate, DoctorController.getDoctor);
router.post("/like/:doctorId", authenticate, DoctorController.toggleLike);

module.exports = router;
