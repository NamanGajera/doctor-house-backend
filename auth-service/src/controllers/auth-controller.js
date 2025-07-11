const { AuthService } = require("../services");
const { Enums } = require("../utils/common");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { STATUS_CODE } = Enums;

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
}

module.exports = new AuthController();
