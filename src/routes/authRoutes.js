const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { protect, validateRequest } = require("../middlewares/authMiddleware");
const {
  registerSchema,
  loginSchema,
} = require("../validations/authValidation");

// Public routes
router.post("/register", register, validateRequest(registerSchema));
router.post("/login", login, validateRequest(loginSchema));

module.exports = router;
