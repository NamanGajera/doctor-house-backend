const axios = require("axios");

const AUTH_BASE_URL = "http://auth-service:5001/api/auth";

class AuthService {
  async register(data) {
    const res = await axios.post(`${AUTH_BASE_URL}/register`, data);
    return { status: res.status, data: res.data };
  }

  async login(data) {
    const res = await axios.post(`${AUTH_BASE_URL}/login`, data);
    return { status: res.status, data: res.data };
  }
}

module.exports = new AuthService();
