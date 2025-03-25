const { default: mongoose } = require("mongoose");
const doctorService = require("../services/doctor.service");
const STATUS_CODES = require("../utils/statusCodes");
const ErrorResponse = require("../utils/errorResponse");

exports.getTopDoctors = async (req, res) => {
  try {
    const topDoctors = await doctorService.getTopDoctors();

    const topDoctorData = topDoctors.map((data) => ({
      id: data._id,
      name: data.name,
      doctorType: data.specializations?.[0] ?? null,
      experience: data.experience,
      rating: data.rating,
      address: data.address,
      isLiked: data.isLiked,
      categoryId: data.categoryId,
      // Include category information
      category: data.category
        ? {
            id: data.category._id,
            name: data.category.name,
            description: data.category.description,
            // Include other category fields as needed
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
      isLiked: doctorDetails.isLiked,
      about: doctorDetails.about,
      specializations: doctorDetails.specializations,
      qualifications: doctorDetails.qualifications,
      workingHours: doctorDetails.workingHours,
      timeSlots: doctorDetails.timeSlots,
      hospitalId: doctorDetails.hospitalId,
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
    const categories = await doctorService.getAllCategories();

    const formattedCategories = categories.map((category) => ({
      id: category._id,
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

    const formattedDoctorData = docData.map((doctorDetails) => ({
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
      isLiked: doctorDetails.isLiked,
      about: doctorDetails.about,
      specializations: doctorDetails.specializations,
      qualifications: doctorDetails.qualifications,
      workingHours: doctorDetails.workingHours,
      timeSlots: doctorDetails.timeSlots,
      hospitalId: doctorDetails.hospitalId,
    }));

    res.status(STATUS_CODES.OK).json({
      data: formattedDoctorData,
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
