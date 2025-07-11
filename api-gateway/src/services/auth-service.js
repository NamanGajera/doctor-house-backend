const axios = require("axios");
const AppError = require("../utils/errors/app-error");
const { BaseError } = require("sequelize");
const { serverConfig } = require("../config");
const { Enums, Messages } = require("../utils/common");

const { STATUS_CODE } = Enums;


class AuthService {
  async register(data) {
    try {
      const response = await axios.post(
        `${serverConfig.AUTH_BASE_URL}/register`,
        data
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async login(data) {
    try {
      const response = await axios.post(
        `${serverConfig.AUTH_BASE_URL}/login`,
        data
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

module.exports = new AuthService();
