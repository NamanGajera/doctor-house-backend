const express = require("express");
const router = express.Router();
const userConsentController = require("../controllers/userConsent.controller");
const { protect, authorize } = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Route for creating or updating user consent
router.post(
  "/consent",
  protect,
  upload.single("profileImage"),
  userConsentController.createOrUpdateUserConsent
);

// Route for retrieving user consent
router.get("/consent", protect, userConsentController.getUserConsent);

module.exports = router;
