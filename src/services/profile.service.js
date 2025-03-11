const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const STATUS_CODES = require("../utils/statusCodes");
const cloudinaryService = require("./cloudinary.service");

exports.completeProfile = async (userId, profileData, imageBuffer = null) => {
  const { firstName, lastName, gender, mobileNumber, age } = profileData;

  // Validate required fields
  if (!firstName || !lastName || !gender || !mobileNumber || !age) {
    throw new ErrorResponse(
      "First name, last name, gender, mobile number, and age are required",
      STATUS_CODES.BAD_REQUEST
    );
  }

  // Find user
  const user = await User.findById(userId);
  if (!user) {
    throw new ErrorResponse("User not found", STATUS_CODES.NOT_FOUND);
  }

  // Update profile image if provided
  let profileImageData = null;
  if (imageBuffer) {
    // Upload to Cloudinary
    const uploadResult = await cloudinaryService.uploadBuffer(
      imageBuffer,
      "profile-images"
    );

    profileImageData = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };

    // Delete old profile image if exists
    if (user.profileImage && user.profileImage.publicId) {
      await cloudinaryService.deleteFile(user.profileImage.publicId);
    }
  }

  // Update user profile
  user.firstName = firstName;
  user.lastName = lastName;
  user.gender = gender;
  user.mobileNumber = mobileNumber;
  user.age = age;

  if (profileImageData) {
    user.profileImage = profileImageData;
  }

  // Mark profile as completed
  user.isProfileCompleted = true;

  await user.save();

  // Format user response
  return formatUserResponse(user);
};

exports.updateProfile = async (userId, updateData, imageBuffer = null) => {
  const { firstName, lastName, gender, mobileNumber, age, name } = updateData;

  // Validate required fields
  if (!firstName || !lastName || !gender || !mobileNumber || !age) {
    throw new ErrorResponse(
      "First name, last name, gender, mobile number, and age are required",
      STATUS_CODES.BAD_REQUEST
    );
  }

  // Find user
  const user = await User.findById(userId);
  if (!user) {
    throw new ErrorResponse("User not found", STATUS_CODES.NOT_FOUND);
  }

  // Update profile image if provided
  let profileImageData = null;
  if (imageBuffer) {
    // Upload to Cloudinary
    const uploadResult = await cloudinaryService.uploadBuffer(
      imageBuffer,
      "profile-images"
    );

    profileImageData = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };

    // Delete old profile image if exists
    if (user.profileImage && user.profileImage.publicId) {
      await cloudinaryService.deleteFile(user.profileImage.publicId);
    }
  }

  // Update user profile fields
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (gender) user.gender = gender;
  if (mobileNumber) user.mobileNumber = mobileNumber;
  if (age) user.age = age;
  if (name) user.name = name;

  if (profileImageData) {
    user.profileImage = profileImageData;
  }

  // Save changes
  await user.save();

  // Format user response
  return formatUserResponse(user);
};

/**
 * Get user profile
 * @param {String} userId - User ID
 * @returns {Promise<Object>} User profile
 */
exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ErrorResponse("User not found", STATUS_CODES.NOT_FOUND);
  }

  return formatUserResponse(user);
};

/**
 * Format consistent user response with proper null handling
 * @param {Object} user - User document
 * @returns {Object} Formatted user object
 */
const formatUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name || null,
    firstName: user.firstName || null,
    lastName: user.lastName || null,
    email: user.email || null,
    gender: user.gender || null,
    mobileNumber: user.mobileNumber || null,
    age: user.age || null,
    profileImage: user.profileImage ? user.profileImage.url : null,
    role: user.role || null,
    isProfileCompleted: user.isProfileCompleted || false,
  };
};
