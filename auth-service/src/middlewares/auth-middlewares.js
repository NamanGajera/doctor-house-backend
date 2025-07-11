const { ErrorResponse, Enums, Messages } = require("../utils/common");
const { STATUS_CODE } = Enums;

class AuthMiddleware {
    validateRegisterRequest(req, res, next) {
        const { email, password } = req.body;

        if (!req.body) {
            ErrorResponse.message = Messages.REQUIRED_BODY;
            ErrorResponse.statusCode = STATUS_CODE.BAD_REQUEST;
            return res.status(STATUS_CODE.BAD_REQUEST).json(ErrorResponse);
        }

        const requiredFields = ["email", "password",];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                ErrorResponse.message = Messages.REQUIRED_FIELD(field);
                return res.status(STATUS_CODE.BAD_REQUEST).json(ErrorResponse);
            }
        }

        next();
    };
    validateLoginRequest(req, res, next) {
        const { email, password } = req.body;

        if (!req.body) {
            ErrorResponse.message = Messages.REQUIRED_BODY;
            ErrorResponse.statusCode = STATUS_CODE.BAD_REQUEST;
            return res.status(STATUS_CODE.BAD_REQUEST).json(ErrorResponse);
        }

        const requiredFields = ["email", "password",];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                ErrorResponse.message = Messages.REQUIRED_FIELD(field);
                return res.status(STATUS_CODE.BAD_REQUEST).json(ErrorResponse);
            }
        }

        next();
    }
}

module.exports = new AuthMiddleware();