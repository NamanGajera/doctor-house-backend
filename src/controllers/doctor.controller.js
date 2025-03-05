const doctorService = require("../services/doctor.service");
const STATUS_CODES = require("../utils/statusCodes");

exports.getTopDoctors = async (req, res) => {
  try {
    const topDoctor = await doctorService.getTopDoctors();

    const topDoctorData = topDoctor.map((data) => ({
      id: data._id,
      name: data.name,
      doctorType: data.doctorType,
      experience: data.experience,
      rating: data.rating,
      address: data.address,
      isLike: data.isLike,
    }));

    res.status(STATUS_CODES.OK).json({
      data: topDoctorData,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message,
      error: error,
    });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctorDetails = await doctorService.getDoctorById(doctorId);

    const formattedDoctorDetails = {
      id: doctorDetails._id,
      name: doctorDetails.name,
      doctorType: doctorDetails.doctorType,
      experience: doctorDetails.experience,
      rating: doctorDetails.rating,
      city: doctorDetails.city,
      state: doctorDetails.state,
      address: doctorDetails.address,
      latitude: doctorDetails.latitude,
      longitude: doctorDetails.longitude,
      isLike: doctorDetails.isLike,
      about: doctorDetails.about,
      specializations: doctorDetails.specializations,
      qualifications: doctorDetails.qualifications,
      workingHours: doctorDetails.workingHours,
      timeSlots: doctorDetails.timeSlots,
    };

    res.status(STATUS_CODES.OK).json({
      data: formattedDoctorDetails,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message,
      error: error,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await doctorCategoryService.getAllCategories();

    const formattedCategories = categories.map((category) => ({
      id: category._id,
      name: category.name,
    }));

    res.status(STATUS_CODES.OK).json({
      data: formattedCategories,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: `${error.message}`,
      error: error,
    });
  }
};
