const express = require('express');
const router = express.Router();
const userConsentController = require('../controllers/userConsent.controller');
const { protect, authorize } = require('../middlewares/authMiddleware');
const multer = require('multer');

// Configure multer for file upload
const upload = multer({ 
  dest: 'uploads/', 
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Route for creating or updating user consent
router.post(
  '/consent', 
  protect, 
  upload.single('profileImage'), 
  userConsentController.createOrUpdateUserConsent
);

// Route for retrieving user consent
router.get(
  '/consent', 
  protect, 
  userConsentController.getUserConsent
);

module.exports = router;