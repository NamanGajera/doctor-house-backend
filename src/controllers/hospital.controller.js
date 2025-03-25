const hospitalService = require("../services/hospital.service");
const STATUS_CODES = require("../utils/statusCodes");
const doctor = require("../models/doctor.model");

exports.getTopHospitals = async (req, res) => {
  try {
    const topHospital = await hospitalService.getTopHospitals();

    const topHospitalData = await topHospital.map((data) => ({
      id: data._id,
      name: data.name || null,
      hospitalType: data.hospitalType || null,
      experience: data.experience || null,
      rating: data.rating || null,
      address: data.address || null,
      contactNumber: data.contactNumber || null,
      isLiked: data.isLiked || null,
    }));

    res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      topHospital: topHospitalData,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message,
      error: error,
    });
  }
};

exports.getHospitalById = async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const hospitalDetails = await hospitalService.getHospitalById(hospitalId);

    const doctorDetails = await doctor.find({ hospitalId: hospitalId });

    const formattedDoctorDetails =
      doctorDetails.length > 0
        ? doctorDetails.map((doc) => ({
            id: doc._id,
            hospitalId: doc.hospitalId,
            name: doc.name,
            doctorType: doc.doctorType,
            experience: doc.experience,
            rating: doc.rating,
            address: doc.address,
            isLiked: doc.isLiked,
          }))
        : null; // Return null if no doctors found

    const formattedHospitalDetails = {
      id: hospitalDetails._id,
      name: hospitalDetails.name || null,
      hospitalType: hospitalDetails.hospitalType || null,
      experience: hospitalDetails.experience || null,
      rating: hospitalDetails.rating || null,
      address: hospitalDetails.address || null,
      contactNumber: hospitalDetails.contactNumber || null,
      isLiked: hospitalDetails.isLiked,
      city: hospitalDetails.city || null,
      state: hospitalDetails.state || null,
      latitude: hospitalDetails.latitude || null,
      longitude: hospitalDetails.longitude || null,
      distance: hospitalDetails.distance || null,
      openHours: hospitalDetails.openHours || null,
      website: hospitalDetails.website || null,
      treatment: hospitalDetails.treatments || null,
      doctors: formattedDoctorDetails, // Will be null if no doctors found
      gallery: hospitalDetails.gallery || null,
    };

    res.status(STATUS_CODES.OK).json({
      data: formattedHospitalDetails,
      statusCode: STATUS_CODES.OK,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message,
      error: error,
    });
  }
};

exports.toggleHospitalLike = async (req, res) => {
  try {
    const { hospitalId, isLiked } = req.body;
    const userId = req.user._id;

    if (!hospitalId) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: "Hospital Id is required",
      });
    }

    if (typeof isLiked !== "boolean") {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: "Invalid wishlist status. Must be a boolean value.",
      });
    }

    const result = await hospitalService.toggleHospitalLike(
      hospitalId,
      userId,
      isLiked
    );

    res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      message: isLiked
        ? "Hospital added to wishlist"
        : "Hospital removed from wishlist",
      result: result,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message,
      error: error,
    });
  }
};

exports.getUserLikedHospital = async (req, res) => {
  try {
    const userId = req.user._id;

    const likedHospital = await hospitalService.getLikesHospital(userId);

    res.status(STATUS_CODES.OK).json({
      data: likedHospital,
      statusCode: STATUS_CODES.OK,
    });
  } catch (error) {
    req.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message,
      error: error,
    });
  }
};
