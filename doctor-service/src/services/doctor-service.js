const { DoctorRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { BaseError } = require("sequelize");
const { Messages } = require("../utils/common");



const { STATUS_CODE } = Enums;
const doctorRepository = new DoctorRepository();

class DoctorService { }

module.exports = new DoctorService();