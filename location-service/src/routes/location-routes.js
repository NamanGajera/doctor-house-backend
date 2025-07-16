const express = require("express");
const router = express.Router();
const { LocationController } = require("../controllers");


router.post("/internal/resolve", LocationController.resolveLocations);
router.get("/internal", async (req, res) => {
    console.log("Api Call on location");
    res.json({ data: "hellow" });
});


module.exports = router;
