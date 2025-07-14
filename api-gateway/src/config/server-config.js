const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    AUTH_BASE_URL: process.env.AUTH_BASE_URL,
    DOCTOR_BASE_URL: process.env.DOCTOR_BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
};
