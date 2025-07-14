const express = require("express");
const router = express.Router();
const { DoctorController } = require("../controllers");
const authenticate = require("../middlewares/auth-middlewares");



router.get(
    "/",
    authenticate,
    DoctorController.getAllDoctors
);

router.get(
    "/:id",
    authenticate,
    DoctorController.getDoctor
);

router.post("/like/:doctorId", authenticate, DoctorController.toggleLike);

module.exports = router;
