const hospital = require("../models/hospital.model");
const ErrorResponse = require("../utils/errorResponse");
const STATUS_CODES = require("../utils/statusCodes");
const mongoose = require("mongoose");
const { getUserLikedDoctors } = require("./doctor.service");
const { transformObjectIds } = require("../utils/common_functions");

exports.getTopHospitals = async () => {
  try {
    return await hospital.find({ rating: { $gt: 4.6 } });
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.BAD_REQUEST);
  }
};

exports.getHospitalById = async (hospitalId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
      throw new ErrorResponse("Invalid hospital ID", STATUS_CODES.BAD_REQUEST);
    }
    const hospitalDetails = await hospital.findById(hospitalId);

    if (!hospitalDetails) {
      throw new ErrorResponse("Hospital not found", STATUS_CODES.NOT_FOUND);
    }

    return hospitalDetails;
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};

exports.toggleHospitalLike = async (hospitalId, userId, isLiked) => {
  try {
    // Input validation
    if (!hospitalId || !mongoose.Types.ObjectId.isValid(hospitalId)) {
      throw new ErrorResponse(
        "Invalid or missing hospital ID",
        STATUS_CODES.BAD_REQUEST
      );
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new ErrorResponse(
        "Invalid or missing user ID",
        STATUS_CODES.BAD_REQUEST
      );
    }

    // Check hospital exists
    const hospitalExists = await hospital.exists({ _id: hospitalId });
    if (!hospitalExists) {
      throw new ErrorResponse("Hospital not found", STATUS_CODES.NOT_FOUND);
    }

    const updateOperation = isLiked
      ? {
          $addToSet: { likedBy: userId },
          $set: { isLiked: true },
        }
      : {
          $pull: { likedBy: userId },
          $set: { isLiked: false },
        };

    const updatedHospital = await hospital.findByIdAndUpdate(
      hospitalId,
      updateOperation,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedHospital) {
      throw new ErrorResponse(
        "Failed to update hospital",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }

    // Return consistent response
    return {
      isLiked: updatedHospital.likedBy.includes(userId),
      likedCount: updatedHospital.likedBy.length,
    };
  } catch (error) {
    console.error("Toggle Hospital Like Error:", error);
    throw new ErrorResponse(
      error.message || "Failed to update hospital like status",
      error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
};
exports.getLikesHospital = async (userId) => {
  try {
    const likedHospital = await hospital.find({ likedBy: userId });

    const formatedHospital = await transformObjectIds(likedHospital);

    return formatedHospital.map((hospital) => ({
      id: hospital.id,
      name: hospital.name || null,
      hospitalType: hospital.hospitalType || null,
      experience: hospital.experience || null,
      rating: hospital.rating || null,
      address: hospital.address || null,
      contactNumber: hospital.contactNumber || null,
      isLiked: true,
    }));
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.BAD_REQUEST);
  }
};
