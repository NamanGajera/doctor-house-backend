const { DoctorService } = require("../services");
const { SuccessResponse, ErrorResponse, Enums } = require("../utils/common");

const { STATUS_CODE } = Enums;

class DoctorController {
  async getAllDoctors(req, res) {
    console.log("getAllDoctors => ", req.params);
    console.log("getAllDoctors => ", req.query);
    try {
      const doctors = await DoctorService.getAllDoctors({
        userId: req.user.id,
        query: req.query,
      });
      SuccessResponse.data = doctors;
      SuccessResponse.message = "Doctors fetched successfully";
      return res.status(STATUS_CODE.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.message = error.message;
      return res
        .status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
  }
  async getDoctor(req, res) {
    try {
      const doctors = await DoctorService.getDoctor(req.params.id);
      SuccessResponse.data = doctors;
      SuccessResponse.message = "Doctor fetched successfully";
      return res.status(STATUS_CODE.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.message = error.message;
      return res
        .status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
  }
  async toggleLike(req, res) {
    try {
      const doctors = await DoctorService.toggleLike(
        req.user.id,
        req.params.doctorId
      );
      return res.status(STATUS_CODE.OK).json(doctors);
    } catch (error) {
      ErrorResponse.message = error.message;
      return res
        .status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
  }
  async getAllLikedDoctor(req, res) {
    try {
      const doctors = await DoctorService.getAllLikedDoctor(req.user.id);
      return res.status(STATUS_CODE.OK).json(doctors);
    } catch (error) {
      ErrorResponse.message = error.message;
      return res
        .status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
  }
  async updateDoctor(req, res) {
    try {
      const doctorId = req.params.id;
      const data = req.body;
      const files = {
        profilePic: req.files?.profilePic?.[0] ?? null,
      };
      console.log("Data for update-->>>", files);
      const response = await DoctorService.updateDoctor(doctorId, data, files);
      return res.status(STATUS_CODE.OK).json(response);
    } catch (error) {
      console.log("Data Error-->>>", error);
      ErrorResponse.message = error.message;
      return res
        .status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
  }
}

module.exports = new DoctorController();
