const authRoute = require("./auth-route");
const express = require("express");

const router = express.Router();

router.use("/auth", authRoute);

module.exports = router;
