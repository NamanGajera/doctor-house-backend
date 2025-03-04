const doctor = require("../models/doctor.model");
const doctorCategory = require("../models/options.model");
const ErrorResponse = require("../utils/errorResponse");
const STATUS_CODES = require("../utils/statusCodes");

exports.getTopDoctors = async () => {
  try {
    return await doctor.find({ rating: { $gt: 4.4 } });
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.BAD_REQUEST);
  }
};

exports.getDoctorById = async (doctorId) => {
  try {
    const doctorDetails = await doctor.findById(doctorId);

    if (!doctorDetails) {
      throw new ErrorResponse("Doctor not found", STATUS_CODES.NOT_FOUND);
    }

    return doctorDetails;
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.BAD_REQUEST);
  }
};

exports.getAllCategories = async () => {
  try {
    return await doctorCategory.find();
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};

exports.toggleDoctorWishlist = async (doctorId, userId, isWishlisted) => {
  try {
    const doctorDetails = await doctor.findById(doctorId);

    if (!doctorDetails) {
      throw new ErrorResponse("Doctor not found", STATUS_CODES.NOT_FOUND);
    }

    // If isWishlisted is true, add to wishlist
    if (isWishlisted) {
      // Check if user is not already in likedBy array
      if (!doctorDetails.likedBy.includes(userId)) {
        doctorDetails.likedBy.push(userId);
      }
      doctorDetails.isLiked = true;
    } else {
      // If isWishlisted is false, remove from wishlist
      const userIndex = doctorDetails.likedBy.indexOf(userId);
      if (userIndex > -1) {
        doctorDetails.likedBy.splice(userIndex, 1);
      }
      // Update isLiked based on remaining liked users
      doctorDetails.isLiked = doctorDetails.likedBy.length > 0;
    }

    await doctorDetails.save();

    return {
      isLiked: doctorDetails.isLiked,
      likedCount: doctorDetails.likedBy.length,
    };
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.BAD_REQUEST);
  }
};

// Method to get user's liked doctors
exports.getUserLikedDoctors = async (userId) => {
  try {
    const likedDoctors = await doctor.find({ likedBy: userId });

    return likedDoctors.map((doc) => ({
      id: doc._id,
      name: doc.name,
      doctorType: doc.doctorType,
      experience: doc.experience,
      rating: doc.rating,
      address: doc.address,
      isLiked: true, // Since we're fetching liked doctors, this is always true
    }));
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.BAD_REQUEST);
  }
};
