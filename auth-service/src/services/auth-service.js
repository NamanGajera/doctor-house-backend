const bcrypt = require("bcryptjs");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { BaseError } = require("sequelize");
const { Messages } = require("../utils/common");
const { generateToken } = require("../utils/helpers/generate-token");

const { STATUS_CODE } = Enums;

const userRepository = new UserRepository();

class AuthService {
  async login(data) {
    try {
      const user = await userRepository.findByEmail(data.email);
      if (!user) {
        throw new AppError(Messages.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
      }
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw new AppError(
          Messages.INVALID_CREDENTIAL,
          STATUS_CODE.INTERNAL_SERVER_ERROR
        );
      }
      const token = generateToken(user.id);
      return { token, user };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      if (error instanceof BaseError) {
        const message =
          error.errors?.[0]?.message ||
          error.message ||
          Messages.SOMETHING_WRONG;
        throw new AppError(message, STATUS_CODE.BAD_REQUEST);
      }

      throw new AppError(
        Messages.SOMETHING_WRONG,
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = new AuthService();
