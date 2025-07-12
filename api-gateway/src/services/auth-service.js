const axios = require("axios");
const { serverConfig } = require("../config");

class AuthService {
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
  async registerPatient(data) {
    try {
      const response = await axios.post(
        `${serverConfig.AUTH_BASE_URL}/patient/register`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
  async registerDoctor(data) {
    try {
      const response = await axios.post(
        `${serverConfig.AUTH_BASE_URL}/doctor/register`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
}

module.exports = new AuthService();
