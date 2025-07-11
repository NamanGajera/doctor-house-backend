const { PatientService } = require("../services");
const { Enums } = require("../utils/common");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { STATUS_CODE, USER_ROLE } = Enums;

class PatientController {
  async register(req, res) {
    const { email, password, phone, name } = req.body;
    try {
      const user = await PatientService.register({
        email,
        password,
        phone,
        name,
        role: USER_ROLE.PATIENT,
      });
      SuccessResponse.data = user;
      SuccessResponse.message = "Patient registered successfully";
      return res.status(STATUS_CODE.CREATED).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.message = error.message;
      res.status(error.statusCode).json(ErrorResponse);
    }
  }
}

module.exports = new PatientController();
