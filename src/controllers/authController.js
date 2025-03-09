const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const STATUS_CODES = require("../utils/statusCodes");

// Get token
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(statusCode).json({
    statusCode: statusCode,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      hasAcceptedConsent: user.hasAcceptedConsent,
      profile: user.profile,
    },
  });
};

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(
      new ErrorResponse("Email already in use", STATUS_CODES.BAD_REQUEST)
    );
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(
      new ErrorResponse(
        "Please provide an email and password",
        STATUS_CODES.BAD_REQUEST
      )
    );
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorResponse("Invalid credentials", STATUS_CODES.UNAUTHORIZED)
    );
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(
      new ErrorResponse("Invalid credentials", STATUS_CODES.UNAUTHORIZED)
    );
  }

  sendTokenResponse(user, 200, res);
});
