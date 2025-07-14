const { DoctorService } = require("../services");
const { SuccessResponse, ErrorResponse, Enums } = require("../utils/common");

const { STATUS_CODE } = Enums;

class DoctorController {
    async getAllDoctors(req, res) {
        try {
            const doctors = await DoctorService.getAllDoctors();
            SuccessResponse.data = doctors;
            SuccessResponse.message = "Doctors fetched successfully";
            return res.status(STATUS_CODE.OK).json(SuccessResponse);
        } catch (error) {
            ErrorResponse.message = error.message;
            return res.status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR).json(ErrorResponse);
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
            return res.status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        }
    }
    async toggleLike(req, res) {
        try {
            const doctors = await DoctorService.toggleLike(req.user.id, req.params.doctorId);
            SuccessResponse.data = doctors;
            return res.status(STATUS_CODE.OK).json(SuccessResponse);
        } catch (error) {
            ErrorResponse.message = error.message;
            return res.status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        }
    }
}

module.exports = new DoctorController();