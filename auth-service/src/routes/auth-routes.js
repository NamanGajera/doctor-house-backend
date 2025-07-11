const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");
const { AuthMiddleware } = require("../middlewares");

router.post("/register", AuthMiddleware.validateRegisterRequest, AuthController.register);
router.post("/login", AuthMiddleware.validateLoginRequest, AuthController.login);

module.exports = router;
