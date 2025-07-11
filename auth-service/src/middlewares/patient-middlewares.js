const { ErrorResponse, Enums, Messages, Regex } = require("../utils/common");
const { STATUS_CODE } = Enums;

class PatientMiddleware {
  validateRegisterRequest(req, res, next) {
    if (!req.body) {
      ErrorResponse.message = Messages.REQUIRED_BODY;
      ErrorResponse.statusCode = STATUS_CODE.BAD_REQUEST;
      return res.status(STATUS_CODE.BAD_REQUEST).json(ErrorResponse);
    }
    const { email, password, phone, name } = req.body;

    const requiredFields = ["email", "password", "phone", "name"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        ErrorResponse.message = Messages.REQUIRED_FIELD(field);
        return res.status(STATUS_CODE.BAD_REQUEST).json(ErrorResponse);
      }
    }

    if (!Regex.EMAIL.test(email)) {
      ErrorResponse.message = Messages.INVALID_EMAIL;
      return res.status(STATUS_CODE.BAD_REQUEST).json(ErrorResponse);
    }

    if (!Regex.PHONE.test(phone)) {
      ErrorResponse.message = Messages.INVALID_PHONE;
      return res.status(STATUS_CODE.BAD_REQUEST).json(ErrorResponse);
    }

    next();
  }
}

module.exports = new PatientMiddleware();
