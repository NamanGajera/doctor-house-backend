const { AuthService } = require("../services");
const { SuccessResponse, ErrorResponse, Enums } = require("../utils/common");
const { STATUS_CODE, USER_ROLE } = Enums;

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await AuthService.login({ email, password });
      SuccessResponse.data = user;
      SuccessResponse.message = "Login successful";
      return res.status(STATUS_CODE.CREATED).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.message = error.message;
      res.status(error.statusCode).json(ErrorResponse);
    }
  }
  async registerPatient(req, res) {
    const { email, password, phone, fullName } = req.body;
    try {
      const user = await AuthService.registerPatient({
        fullName,
        email,
        password,
        phone,
        role: USER_ROLE.PATIENT,
      });
      SuccessResponse.data = user;
      SuccessResponse.message = "Patient registered successfully";
      return res.status(STATUS_CODE.CREATED).json(SuccessResponse);
    } catch (error) {
      console.log("Error----------->>", error);
      ErrorResponse.message = error.message;
      res.status(error.statusCode).json(ErrorResponse);
    }
  }
  async registerDoctor(req, res) {
    const { email, password, phone, fullName } = req.body;
    try {
      const user = await AuthService.registerDoctor({
        fullName,
        email,
        password,
        phone,
        role: USER_ROLE.DOCTOR,
      });
      SuccessResponse.data = user;
      SuccessResponse.message = "Doctor registered successfully";
      return res.status(STATUS_CODE.CREATED).json(SuccessResponse);
    } catch (error) {
      console.log("Error----------->>", error);
      ErrorResponse.message = error.message;
      res.status(error.statusCode).json(ErrorResponse);
    }
  }
}

module.exports = new AuthController();
