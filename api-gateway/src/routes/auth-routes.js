const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");

router.post("/login", AuthController.login);
router.post("/patient/register", AuthController.registerPatient);
router.post("/doctor/register", AuthController.registerDoctor);

module.exports = router;
