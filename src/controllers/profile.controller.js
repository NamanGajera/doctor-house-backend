const asyncHandler = require("../utils/asyncHandler");
const profileService = require("../services/profile.service");
const STATUS_CODES = require("../utils/statusCodes");

// Complete user profile
exports.completeProfile = async (req, res) => {
  try {
    // Get file buffer from multer if it exists
    const imageBuffer = req.file ? req.file.buffer : null;

    // Call service to handle business logic
    const user = await profileService.completeProfile(
      req.user._id,
      req.body,
      imageBuffer
    );

    // Return response
    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      message: "Profile completed successfully",
      user,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

// Update user profile
exports.updateProfile = asyncHandler(async (req, res, next) => {
  // Get file buffer from multer if it exists
  const imageBuffer = req.file ? req.file.buffer : null;

  // Call service to handle business logic
  const user = await profileService.updateProfile(
    req.user.id,
    req.body,
    imageBuffer
  );

  // Return response
  res.status(STATUS_CODES.OK).json({
    statusCode: STATUS_CODES.OK,
    message: "Profile updated successfully",
    user,
  });
});

// Get user profile
exports.getProfile = asyncHandler(async (req, res, next) => {
  // Call service to get user profile
  const user = await profileService.getUserProfile(req.user.id);

  // Return response
  res.status(STATUS_CODES.OK).json({
    statusCode: STATUS_CODES.OK,
    user,
  });
});
