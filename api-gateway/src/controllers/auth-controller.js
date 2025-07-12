const { AuthService } = require("../services");
const { Enums } = require("../utils/common");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const { STATUS_CODE } = Enums;

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const response = await AuthService.login({
        email,
        password,
      });
      return res.status(STATUS_CODE.CREATED).json(response);
    } catch (error) {
      ErrorResponse.message = error.message;
      res.status(error.statusCode || 500).json(ErrorResponse);
    }
  }

  async registerPatient(req, res) {
    const { email, password, phone, fullName } = req.body;
    try {
      const response = await AuthService.registerPatient({
        email,
        password,
        fullName,
        phone,
      });
      return res.status(STATUS_CODE.CREATED).json(response);
    } catch (error) {
      ErrorResponse.message = error.message;
      res.status(error.statusCode || 500).json(ErrorResponse);
    }
  }

  async registerDoctor(req, res) {
    const { email, password, phone, fullName } = req.body;
    try {
      const response = await AuthService.registerDoctor({
        email,
        password,
        fullName,
        phone,
      });
      return res.status(STATUS_CODE.CREATED).json(response);
    } catch (error) {
      ErrorResponse.message = error.message;
      res.status(error.statusCode || 500).json(ErrorResponse);
    }
  }
}

module.exports = new AuthController();
