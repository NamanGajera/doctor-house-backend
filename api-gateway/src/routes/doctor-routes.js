const express = require("express");
const router = express.Router();
const { DoctorController } = require("../controllers");
const authenticate = require("../middlewares/auth-middleware");
const { fileUpload } = require("../middlewares/file-upload");

router.get("/", authenticate, DoctorController.getAllDoctor);

router.post("/like/:doctorId", authenticate, DoctorController.toggleLike);

router.get("/liked", authenticate, DoctorController.getAllLikedDoctor);

router.get("/:id", authenticate, DoctorController.getDoctor);

router.post(
  "/update/:id",
  fileUpload.fields([{ name: "profilePic", maxCount: 1 }]),
  authenticate,
  DoctorController.updateDoctor
);

module.exports = router;
