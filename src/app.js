const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./middlewares/errorMiddleware");

// Route files
const authRoutes = require("./routes/authRoutes");
const doctor = require("./routes/doctor.route");
const hospital = require("./routes/hospital.route");
const appointment = require("./routes/appointment.route");
const consent = require("./routes/userConsent.route");

// Initialize express
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// Security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Sanitize data
app.use(mongoSanitize());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", doctor);
app.use("/api/v1", hospital);
app.use("/api/v1", appointment);
app.use("/api/v1", consent);

// Base route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// 404 route
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
