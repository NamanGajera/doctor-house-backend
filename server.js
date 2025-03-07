const dotenv = require("dotenv");

// Load env vars
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const LOCAL_IP = process.env.LOCAL_IP || "192.168.1.14";

const server = app.listen(PORT, LOCAL_IP, () => {
  console.log(`Server running on http://${LOCAL_IP}:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
