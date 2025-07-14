const express = require("express");
const router = express.Router();
// const { AuthController } = require("../controllers");
const { AuthMiddleware } = require("../middlewares");

// router.post(
//   "/login",
//   AuthMiddleware.validateLoginRequest,
//   AuthController.login
// );
// router.post(
//   "/patient/register",
//   AuthMiddleware.validateRegisterRequest,
//   AuthController.registerPatient
// );
// router.post(
//   "/doctor/register",
//   AuthMiddleware.validateRegisterRequest,
//   AuthController.registerDoctor
// );

module.exports = router;
