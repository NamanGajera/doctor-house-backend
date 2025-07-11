const bcrypt = require("bcryptjs");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { BaseError } = require("sequelize");
const { Messages } = require("../utils/common");
const { generateToken } = require("../utils/helpers/generate-token");

const { STATUS_CODE } = Enums;

const userRepository = new UserRepository();

class PatientService {
  async register(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await userRepository.create({
        ...data,
        password: hashedPassword,
      });
      const token = generateToken(user.id);
      return { user, token };
    } catch (error) {
      console.log("Error==>>>>>\n", error);
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

module.exports = new PatientService();
