const express = require("express");
const router = express.Router();

const patientRoute = require("./patient-routes");
const authRoute = require("./auth-routes");

router.use("/patient", patientRoute);
router.use("/login", authRoute);

module.exports = router;
