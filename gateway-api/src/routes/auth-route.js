// src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const { login } = require("../services/auth-service");

router.post("/login", async (req, res) => {
    try {
        const data = await login(req.body);
        res.json(data);
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data || { message: "Gateway Error" };
        res.status(status).json(message);
    }
});

module.exports = router;
