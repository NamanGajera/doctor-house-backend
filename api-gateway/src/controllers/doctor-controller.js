const { DoctorService } = require("../services");
const { Enums } = require("../utils/common");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const { STATUS_CODE } = Enums;

class DoctorController {
    async getAllDoctor(req, res) {
        try {
            const response = await DoctorService.getAllDoctor({
                Authorization: req.headers.authorization
            });
            return res.status(STATUS_CODE.CREATED).json(response);
        } catch (error) {
            ErrorResponse.message = error.message;
            res.status(error.statusCode || 500).json(ErrorResponse);
        }
    }
    async getDoctor(req, res) {
        try {
            const response = await DoctorService.getDoctor(req.params.id, {
                Authorization: req.headers.authorization
            });
            return res.status(STATUS_CODE.CREATED).json(response);
        } catch (error) {
            console.log(error);
            ErrorResponse.message = error.message;
            res.status(error.statusCode || 500).json(ErrorResponse);
        }
    }
    async toggleLike(req, res) {
        try {
            const response = await DoctorService.toggleLike(req.params.doctorId, {
                Authorization: req.headers.authorization
            });
            return res.status(STATUS_CODE.CREATED).json(response);
        } catch (error) {
            ErrorResponse.message = error.message;
            res.status(error.statusCode || 500).json(ErrorResponse);
        }
    }


}

module.exports = new DoctorController();
