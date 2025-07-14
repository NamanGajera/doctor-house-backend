const jwt = require("jsonwebtoken");

const { serverConfig } = require("../../config");

const verifyToken = (token) => {
    console.log("Token ==>>>", token);
    return jwt.verify(token, serverConfig.JWT_SECRET);
};

module.exports = { verifyToken };