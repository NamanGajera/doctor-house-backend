const doctorRoute = require("./doctor-routes");
const express = require("express");

const router = express.Router();

router.use("/doctor", doctorRoute);

module.exports = router;
