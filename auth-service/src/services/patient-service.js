const bcrypt = require("bcryptjs");
const { UserRepository, PatientRepository } = require("../repositories");
const db = require("../models");
const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { BaseError } = require("sequelize");
const { Messages } = require("../utils/common");
const { generateToken } = require("../utils/helpers/generate-token");

const { STATUS_CODE } = Enums;

const userRepository = new UserRepository();
const patientRepository = new PatientRepository();

class PatientService {
  async register(data) {
    const transaction = await db.sequelize.transaction();

    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const payload = {
        fullName: data.name,
        phone: data.phone,
        email: data.email,
        name: data.name,
        password: hashedPassword,
      };
      const user = await userRepository.registerUser(payload, transaction);
      const patient = await patientRepository.createPatient(
        { ...payload, patientId: user.id },
        transaction
      );

      const token = generateToken(user.id);
      await transaction.commit();
      return { token, user };
    } catch (error) {
      await transaction.rollback();
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
