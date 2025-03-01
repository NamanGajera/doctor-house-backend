const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  logout, 
  getMe, 
  forgotPassword, 
  resetPassword, 
  updateDetails, 
  updatePassword, 
  refreshToken 
} = require('../controllers/authController');
const { protect, validateRequest } = require('../middlewares/authMiddleware');
const { 
  registerSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema 
} = require('../validations/authValidation');

// Public routes
router.post('/register', register,validateRequest(registerSchema));
router.post('/login', login,validateRequest(loginSchema));
router.post('/refresh-token', refreshToken);
router.post('/forgotpassword', forgotPassword,validateRequest(forgotPasswordSchema));
router.put('/resetpassword/:resettoken', resetPassword);

// Protected routes
router.use(protect);
router.get('/me', getMe);
router.get('/logout', logout);
router.put('/updatedetails', updateDetails);
router.put('/updatepassword', updatePassword);

module.exports = router;