const { Op } = require("sequelize");
const { DoctorRepository, DoctorLikesRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { BaseError } = require("sequelize");
const { Messages } = require("../utils/common");

const { STATUS_CODE } = Enums;
const doctorRepository = new DoctorRepository();
const doctorLikesRepository = new DoctorLikesRepository();

class DoctorService {
  async getAllDoctors(data) {
    const { userId, query } = data;
    console.log("data userId ==>> ", userId);
    console.log("data query ==>> ", query);
    const customFilter = {};
    try {
      if (query.minRating) {
        customFilter.rating = {
          [Op.gte]: query.minRating
        };
      }
      const doctors = await doctorRepository.findAllDoctors(userId, customFilter);
      return doctors;
    } catch (error) {
      console.error("Error in DoctorService.getAllDoctors:", error);
      if (error instanceof AppError) throw error;
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
      const like = await doctorLikesRepository.findOne({ doctorId: doctor.userId });
      if (!doctor) {
        throw new AppError("Doctor not found", STATUS_CODE.NOT_FOUND);
      }
      return {
        ...doctor.toJSON(),
        isLiked: !!like
      };
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

  async getAllLikedDoctor(userId) {
    try {
      const response = await doctorLikesRepository.getAllLikedDoctor(userId);
      return { data: response };
    } catch (error) {
      console.error("Error in DoctorService.getAllLikedDoctor:", error);
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
