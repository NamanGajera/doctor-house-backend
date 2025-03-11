const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const STATUS_CODES = require("../utils/statusCodes");

/**
 * Generate JWT token for a user
 * @param {Object} user - User object
 * @returns {String} JWT token
 */
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * Format user response with token
 * @param {Object} user - User object
 * @returns {Object} Response with token and user data
 */
const formatAuthResponse = (user) => {
  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      name: user.name || null,
      email: user.email || null,
      role: user.role || null,
      isProfileCompleted: user.isProfileCompleted || false,
    },
  };
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Authentication response
 */
exports.register = async (userData) => {
  const { name, email, password } = userData;

  // Check if user with this email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ErrorResponse("Email already in use", STATUS_CODES.BAD_REQUEST);
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  return formatAuthResponse(user);
};

/**
 * Login user with email and password
 * @param {Object} credentials - Login credentials
 * @returns {Promise<Object>} Authentication response
 */
exports.login = async (credentials) => {
  const { email, password } = credentials;

  // Check if email and password exist
  if (!email || !password) {
    throw new ErrorResponse(
      "Please provide an email and password",
      STATUS_CODES.BAD_REQUEST
    );
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ErrorResponse("Invalid credentials", STATUS_CODES.UNAUTHORIZED);
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ErrorResponse("Invalid credentials", STATUS_CODES.UNAUTHORIZED);
  }

  return formatAuthResponse(user);
};
