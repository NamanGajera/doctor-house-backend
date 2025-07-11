const express = require("express");
const router = express.Router();
const { PatientController } = require("../../controllers");
const { PatientMiddleware } = require("../../middlewares");

router.post(
  "/register",
  PatientMiddleware.validateRegisterRequest,
  PatientController.register
);

module.exports = router;
