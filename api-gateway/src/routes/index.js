const authRoutes = require("./auth-routes");
const doctorRoutes = require("./doctor-routes");
const express = require("express");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/doctor", doctorRoutes);

module.exports = router;
