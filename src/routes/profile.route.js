const express = require("express");
const router = express.Router();
const {
  completeProfile,
  updateProfile,
  getProfile,
} = require("../controllers/profile.controller");
const { protect, validateRequest } = require("../middlewares/authMiddleware");
const {
  completeProfileSchema,
  updateProfileSchema,
} = require("../validations/profileValidation");
const fileUpload = require("../middlewares/fileUploadMiddleware");

// All routes are protected
router.use(protect);

// Profile routes
router.post(
  "/complete-profile",
  fileUpload.single("profileImage"),
  validateRequest(completeProfileSchema),
  completeProfile
);

router.put(
  "/update",
  fileUpload.single("profileImage"),
  validateRequest(updateProfileSchema),
  updateProfile
);

router.get("/me", getProfile);

module.exports = router;
