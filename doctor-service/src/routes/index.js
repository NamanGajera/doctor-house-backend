const authRoutes = require("./auth-routes");
const express = require("express");

const router = express.Router();

router.use("/auth", authRoutes);

module.exports = router;
