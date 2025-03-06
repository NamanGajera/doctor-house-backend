const hospital = require("../models/hospital.model");
const ErrorResponse = require("../utils/errorResponse");
const STATUS_CODES = require("../utils/statusCodes");
const mongoose = require("mongoose");
const { getUserLikedDoctors } = require("./doctor.service");

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
    if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
      throw new ErrorResponse("Invalid hospital ID", STATUS_CODES.BAD_REQUEST);
    }
    console.log(`hospitalId ${hospitalId}`);

    const hospitalDetails = await hospital.findById(hospitalId);

    console.log(`hospitalDetails ${hospitalDetails}`);

    if (!hospitalDetails) {
      throw new ErrorResponse("Hospital not found", STATUS_CODES.NOT_FOUND);
    }

    if (isLiked) {
      if (!hospitalDetails.likedBy.includes(userId)) {
        hospitalDetails.likedBy.push(userId);
      }
      hospitalDetails.isLiked = true;
    } else {
      const userIndex = hospitalDetails.likedBy.indexOf(userId);
      if (userIndex > -1) {
        hospitalDetails.likedBy.splice(userIndex, 1);
      }

      hospitalDetails.isLiked = hospitalDetails.likedBy.length > 0;
    }

    await hospitalDetails.save();

    return {
      isLiked: hospitalDetails.isLiked,
      likedCount: hospitalDetails.likedBy.length,
    };
  } catch (error) {
    throw new ErrorResponse(error.message, STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};

exports.getLikesHospital = async (userId) => {
  try {
    const likedHospital = await hospital.find({ likedBy: userId });

    return likedHospital.map((hospital) => ({
      id: hospital._id,
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
