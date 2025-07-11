const axios = require("axios");
const { serverConfig } = require("../config");

class AuthService {
  async registerPatient(data) {
    try {
      const response = await axios.post(
        `${serverConfig.AUTH_BASE_URL}/patient/register`,
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
