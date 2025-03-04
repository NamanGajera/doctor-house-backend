const UserConsent = require('../models/userConsent.model');
const ErrorResponse = require('../utils/errorResponse');
const STATUS_CODES = require('../utils/statusCodes');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryUpload');

exports.createOrUpdateUserConsent = async (userId, consentData, profileImage) => {
  try {
    // Check if user consent already exists
    let userConsent = await UserConsent.findOne({ user: userId });

    // Handle profile image upload
    let imageUploadResult = null;
    if (profileImage) {
      // If user already has a profile image, delete the old one
      if (userConsent && userConsent.profileImage) {
        await deleteFromCloudinary(userConsent.profileImage.publicId);
      }

      // Upload new profile image
      imageUploadResult = await uploadToCloudinary(profileImage, 'user_consents');
    }

    // Prepare consent data
    const consentPayload = {
      user: userId,
      personalDetails: {
        firstName: consentData.firstName,
        lastName: consentData.lastName,
        phoneNumber: consentData.phoneNumber,
        gender: consentData.gender,
        age: consentData.age
      },
      medicalDetails: {
        bloodGroup: consentData.bloodGroup,
        allergies: consentData.allergies || [],
        medicalConditions: consentData.medicalConditions || [],
        emergencyContact: consentData.emergencyContact || {}
      },
      medicalConsent: {
        hasConsented: true,
        consentDate: new Date(),
        consentVersion: '1.0'
      },
      privacySettings: {
        dataSharing: consentData.dataSharing || false,
        marketingCommunication: consentData.marketingCommunication || false
      }
    };

    // Add profile image if uploaded
    if (imageUploadResult) {
      consentPayload.profileImage = {
        url: imageUploadResult.secure_url,
        publicId: imageUploadResult.public_id
      };
    }

    // Update or create
    if (userConsent) {
      userConsent = await UserConsent.findOneAndUpdate(
        { user: userId },
        { $set: consentPayload },
        { new: true, runValidators: true }
      );
    } else {
      userConsent = await UserConsent.create(consentPayload);
    }

    return userConsent;
  } catch (error) {
    console.error('Error in createOrUpdateUserConsent:', error);
    throw new ErrorResponse(
      `Error processing user consent: ${error.message}`, 
      error.statusCode || STATUS_CODES.BAD_REQUEST
    );
  }
};

exports.getUserConsent = async (userId) => {
  try {
    const userConsent = await UserConsent.findOne({ user: userId }).select('-__v');

    if (!userConsent) {
      throw new ErrorResponse('User consent not found', STATUS_CODES.NOT_FOUND);
    }

    return userConsent;
  } catch (error) {
    console.error('Error in getUserConsent:', error);
    throw new ErrorResponse(
      `Error retrieving user consent: ${error.message}`, 
      error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};