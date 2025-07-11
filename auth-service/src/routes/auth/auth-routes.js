const express = require("express");
const router = express.Router();
const { AuthController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

router.post("/", AuthMiddleware.validateLoginRequest, AuthController.login);

module.exports = router;
