const { default: mongoose } = require("mongoose");
const doctorService = require("../services/doctor.service");
const STATUS_CODES = require("../utils/statusCodes");
const ErrorResponse = require("../utils/errorResponse");
const { transformObjectIds } = require("../utils/common_functions");

exports.getTopDoctors = async (req, res) => {
  try {
    const topDoctors = await doctorService.getTopDoctors();

    const formattedDoctorData = await transformObjectIds(topDoctors);

    const topDoctorData = formattedDoctorData.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      doctorType: doctor.specializations?.[0] ?? null,
      experience: doctor.experience,
      rating: doctor.rating,
      address: doctor.address,
      isLiked: doctor.isLiked,
      categoryId: doctor.categoryId,
      category: doctor.category
        ? {
            id: doctor.category.id,
            name: doctor.category.name,
            image: doctor.category.image,
          }
        : null,
    }));

    res.status(STATUS_CODES.OK).json({
      topDoctor: topDoctorData,
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

    const doctorData = await transformObjectIds(doctorDetails);

    const formattedDoctorDetails = {
      id: doctorData.id,
      name: doctorData.name,
      doctorType: doctorData.specializations?.[0] ?? null,
      experience: doctorData.experience,
      rating: doctorData.rating,
      city: doctorData.city,
      state: doctorData.state,
      address: doctorData.address,
      latitude: doctorData.latitude,
      longitude: doctorData.longitude,
      isLiked: doctorData.isLiked,
      about: doctorData.about,
      specializations: doctorData.specializations,
      qualifications: doctorData.qualifications,
      workingHours: doctorData.workingHours,
      timeSlots: doctorData.timeSlots,
      hospitalId: doctorData.hospitalId,
    };

    res.status(STATUS_CODES.OK).json({
      doctorData: formattedDoctorDetails,
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
    const categories = await doctorService.getAllCategories();

    const formattedCategoryData = await transformObjectIds(categories);

    const formattedCategories = formattedCategoryData.map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image,
    }));

    res.status(STATUS_CODES.OK).json({
      doctorCategoryData: formattedCategories,
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

exports.toggleDoctorLike = async (req, res) => {
  try {
    const { doctorId, isLiked } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!doctorId) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: "Doctor ID is required",
      });
    }

    if (typeof isLiked !== "boolean") {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: "Invalid wishlist status. Must be a boolean value.",
      });
    }

    const result = await doctorService.toggleDoctorLike(
      doctorId,
      userId,
      isLiked
    );

    res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      message: isLiked
        ? "Doctor added to wishlist"
        : "Doctor removed from wishlist",
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

exports.getUserLikedDoctors = async (req, res) => {
  try {
    const userId = req.user._id;

    const likedDoctors = await doctorService.getUserLikedDoctors(userId);

    res.status(STATUS_CODES.OK).json({
      data: likedDoctors,
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

exports.getDoctorBYCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id;

    console.log(`doctorData ${categoryId}`);

    const docData = await doctorService.getDoctorByCategoryId(categoryId);

    const formattedDoctor = await transformObjectIds(docData);

    const formattedDoctorData = formattedDoctor.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      doctorType: doctor.doctorType,
      experience: doctor.experience,
      rating: doctor.rating,
      city: doctor.city,
      state: doctor.state,
      address: doctor.address,
      isLiked: doctor.isLiked,
      categoryId: doctor.categoryId,
      category: doctor.category
        ? {
            id: doctor.category.id,
            name: doctor.category.name,
            image: doctor.category.image,
          }
        : null,
    }));

    res.status(STATUS_CODES.OK).json({
      doctorData: formattedDoctorData,
      statusCode: STATUS_CODES.OK,
    });
  } catch (error) {
    res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message,
      error: error,
    });
  }
};
