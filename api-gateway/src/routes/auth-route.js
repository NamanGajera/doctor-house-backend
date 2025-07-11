const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");

router.post("/patient/register", AuthController.registerPatient);
router.post("/login", AuthController.login);

module.exports = router;
