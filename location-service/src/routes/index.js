const locationRoute = require("./location-routes");
const express = require("express");

const router = express.Router();

router.use("/location", locationRoute);

module.exports = router;
