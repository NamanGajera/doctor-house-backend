// src/services/auth.service.js
const axios = require("axios");
const { serverConfig } = require("../config");

const { AUTH_SERVICE_URL } = serverConfig.AUTH_SERVICE_URL;

exports.login = async (payload) => {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, payload);
    return response.data;
};
