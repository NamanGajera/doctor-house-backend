const bcrypt = require("bcryptjs");
const { UserRepository } = require("../repositories");
const db = require("../models");
const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { BaseError } = require("sequelize");
const { Messages } = require("../utils/common");
const { generateToken } = require("../utils/helpers/generate-token");
const { publishDoctorCreated, publishPatientCreated } = require("../queues/publisher");


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

  async registerPatient(data) {
    const transaction = await db.sequelize.transaction();

    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const payload = {
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        role: data.role,
      };
      const user = await userRepository.registerUser(payload, transaction);
      await publishPatientCreated({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      });
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
  async registerDoctor(data) {
    console.log("Doctor Data ==>>", data);
    const transaction = await db.sequelize.transaction();

    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const payload = {
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        role: data.role,
      };
      const user = await userRepository.registerUser(payload, transaction);
      await publishDoctorCreated({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      });

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

module.exports = new AuthService();
