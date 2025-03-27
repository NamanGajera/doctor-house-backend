const hospitalService = require("../services/hospital.service");
const STATUS_CODES = require("../utils/statusCodes");
const doctor = require("../models/doctor.model");
const { transformObjectIds } = require("../utils/common_functions");

exports.getTopHospitals = async (req, res) => {
  try {
    const topHospital = await hospitalService.getTopHospitals();

    const formattedHospital = await transformObjectIds(topHospital);

    const topHospitalData = formattedHospital.map((data) => ({
      id: data.id,
      name: data.name || null,
      hospitalType: data.hospitalType || null,
      experience: data.experience || null,
      rating: data.rating || null,
      address: data.address || null,
      contactNumber: data.contactNumber || null,
      isLiked: data.isLiked,
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

    const formattedHospital = await transformObjectIds(hospitalDetails);

    const doctorDetails = await doctor.find({ hospitalId: hospitalId });

    const formattedDoctor = await transformObjectIds(doctorDetails);

    const formattedDoctorDetails =
      formattedDoctor.length > 0
        ? formattedDoctor.map((doc) => ({
            id: doc.id,
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
      id: formattedHospital.id,
      name: formattedHospital.name || null,
      hospitalType: formattedHospital.hospitalType || null,
      experience: formattedHospital.experience || null,
      rating: formattedHospital.rating || null,
      address: formattedHospital.address || null,
      contactNumber: formattedHospital.contactNumber || null,
      isLiked: formattedHospital.isLiked,
      city: formattedHospital.city || null,
      state: formattedHospital.state || null,
      latitude: formattedHospital.latitude || null,
      longitude: formattedHospital.longitude || null,
      distance: formattedHospital.distance || null,
      openHours: formattedHospital.openHours || null,
      website: formattedHospital.website || null,
      treatment: formattedHospital.treatments || null,
      doctors: formattedDoctorDetails, // Will be null if no doctors found
      gallery: formattedHospital.gallery || null,
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
