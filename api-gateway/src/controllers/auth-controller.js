const { AuthService } = require("../services");
const { Enums } = require("../utils/common");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const { STATUS_CODE } = Enums;

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;
    try {
      const response = await AuthService.register({
        email, password
      });
      return res.status(STATUS_CODE.CREATED).json(response);
    } catch (error) {
      ErrorResponse.message = error.message;
      res.status(error.statusCode || 500).json(ErrorResponse);
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const response = await AuthService.login({
        email, password
      });
      return res.status(STATUS_CODE.CREATED).json(response);
    } catch (error) {
      ErrorResponse.message = error.message;
      res.status(error.statusCode || 500).json(ErrorResponse);
    }
  }
}

module.exports = new AuthController();

