const jwt = require("jsonwebtoken");
const { serverConfig } = require("../../config");


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, serverConfig.JWT_SECRET, {
        expiresIn: "7d",
    });
};

module.exports = { generateToken };
