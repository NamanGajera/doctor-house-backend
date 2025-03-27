const doctor = require("../models/doctor.model");
const doctorCategory = require("../models/options.model");
const ErrorResponse = require("../utils/errorResponse");
const STATUS_CODES = require("../utils/statusCodes");
const mongoose = require("mongoose");
const { attachCategoriesToDoctors } = require("../utils/doctor.utils");

exports.getTopDoctors = async () => {
  try {
    const topDoctors = await doctor.find({ rating: { $gt: 4.4 } });
    const doctorsWithCategories = await attachCategoriesToDoctors(topDoctors);
    return doctorsWithCategories;
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.BAD_REQUEST);
  }
};

exports.getDoctorById = async (doctorId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      throw new ErrorResponse("Invalid doctor ID", STATUS_CODES.BAD_REQUEST);
    }
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

exports.toggleDoctorLike = async (doctorId, userId, isLiked) => {
  try {
    if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) {
      throw new ErrorResponse(
        "Invalid or missing doctor ID",
        STATUS_CODES.BAD_REQUEST
      );
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new ErrorResponse(
        "Invalid or missing user ID",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const existingDoctor = await doctor.findById(doctorId);
    if (!existingDoctor) {
      throw new ErrorResponse("Doctor not found", STATUS_CODES.NOT_FOUND);
    }

    let updateResult;
    if (isLiked) {
      updateResult = await doctor.findByIdAndUpdate(
        doctorId,
        {
          $addToSet: { likedBy: userId },
          $set: { isLiked: true },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      updateResult = await doctor.findByIdAndUpdate(
        doctorId,
        {
          $pull: { likedBy: userId },
          $set: { isLiked: false },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    if (!updateResult) {
      throw new ErrorResponse(
        "Failed to update doctor",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }

    return {
      isLiked: updateResult.likedBy.includes(userId),
      likedCount: updateResult.likedBy.length,
    };
  } catch (error) {
    console.error("Toggle Doctor Like Error:", error);
    throw new ErrorResponse(
      error.message || "Failed to update doctor like status",
      error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};

// Method to get user's liked doctors
exports.getUserLikedDoctors = async (userId) => {
  try {
    const likedDoctors = await doctor.find({ likedBy: userId });

    return likedDoctors.map((doc) => ({
      id: doc._id,
      name: doc.name,
      isLiked: true, // Since we're fetching liked doctors, this is always true
    }));
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.BAD_REQUEST);
  }
};

exports.getDoctorByCategoryId = async (categoryId) => {
  try {
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      const allDoctorsData = await doctor.find();
      return await attachCategoriesToDoctors(allDoctorsData);
    }

    const doctorsData = await doctor.find({ categoryId: categoryId });

    const doctorsWithCategories = await attachCategoriesToDoctors(doctorsData);

    if (doctorsWithCategories.length === 0) {
      return [];
    }

    return doctorsWithCategories;
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};
