const authRoutes = require("./auth");
const express = require("express");

const router = express.Router();

router.use("/auth", authRoutes);

module.exports = router;
