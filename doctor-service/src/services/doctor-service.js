const { DoctorRepository, DoctorLikesRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { BaseError } = require("sequelize");
const { Messages } = require("../utils/common");

const { STATUS_CODE } = Enums;
const doctorRepository = new DoctorRepository();
const doctorLikesRepository = new DoctorLikesRepository();

class DoctorService {
  async getAllDoctors() {
    try {
      const doctors = await doctorRepository.getAll();
      return doctors;
    } catch (error) {
      console.error("Error in DoctorService.getAllDoctors:", error);
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

  async getDoctor(id) {
    try {
      const doctor = await doctorRepository.findDoctor(id);
      if (!doctor) {
        throw new AppError("Doctor not found", STATUS_CODE.NOT_FOUND);
      }
      return doctor;
    } catch (error) {
      console.error("Error in DoctorService.getDoctor:", error);
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

  async toggleLike(userId, doctorId) {
    try {
      await this.getDoctor(doctorId);
      const response = await doctorLikesRepository.toggleLike(userId, doctorId);
      return response;
    } catch (error) {
      console.error("Error in DoctorService.toggleLike:", error);
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

module.exports = new DoctorService();
