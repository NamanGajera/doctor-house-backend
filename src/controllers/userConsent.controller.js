const userConsentService = require('../services/userConsent.service');
const STATUS_CODES = require('../utils/statusCodes');

exports.createOrUpdateUserConsent = async (req, res) => {
  try {
    // Get user ID from authenticated user
    const userId = req.user._id;

    // Handle file upload (profile image)
    const profileImage = req.file ? req.file.path : null;

    // Create or update user consent
    const userConsent = await userConsentService.createOrUpdateUserConsent(
      userId, 
      req.body, 
      profileImage
    );

    // Prepare response data
    const responseData = {
      id: userConsent._id,
      firstName: userConsent.personalDetails.firstName,
      lastName: userConsent.personalDetails.lastName,
      phoneNumber: userConsent.personalDetails.phoneNumber,
      gender: userConsent.personalDetails.gender,
      age: userConsent.personalDetails.age,
      profileImageUrl: userConsent.profileImage?.url || null,
      bloodGroup: userConsent.medicalDetails?.bloodGroup,
      allergies: userConsent.medicalDetails?.allergies,
      medicalConditions: userConsent.medicalDetails?.medicalConditions,
      emergencyContact: userConsent.medicalDetails?.emergencyContact,
      privacySettings: {
        dataSharing: userConsent.privacySettings?.dataSharing,
        marketingCommunication: userConsent.privacySettings?.marketingCommunication
      },
      consentDate: userConsent.medicalConsent.consentDate
    };

    res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: responseData,
      message: 'User consent processed successfully'
    });
  } catch (error) {
    res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message || 'Error processing user consent',
    });
  }
};

exports.getUserConsent = async (req, res) => {
  try {
    // Get user ID from authenticated user
    const userId = req.user._id;

    // Retrieve user consent
    const userConsent = await userConsentService.getUserConsent(userId);

    // Prepare response data (same as createOrUpdateUserConsent)
    const responseData = {
      id: userConsent._id,
      firstName: userConsent.personalDetails.firstName,
      lastName: userConsent.personalDetails.lastName,
      phoneNumber: userConsent.personalDetails.phoneNumber,
      gender: userConsent.personalDetails.gender,
      age: userConsent.personalDetails.age,
      profileImageUrl: userConsent.profileImage?.url || null,
      bloodGroup: userConsent.medicalDetails?.bloodGroup,
      allergies: userConsent.medicalDetails?.allergies,
      medicalConditions: userConsent.medicalDetails?.medicalConditions,
      emergencyContact: userConsent.medicalDetails?.emergencyContact,
      privacySettings: {
        dataSharing: userConsent.privacySettings?.dataSharing,
        marketingCommunication: userConsent.privacySettings?.marketingCommunication
      },
      consentDate: userConsent.medicalConsent.consentDate
    };

    res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: responseData,
      message: 'User consent retrieved successfully'
    });
  } catch (error) {
    res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message || 'Error retrieving user consent',
    });
  }
};