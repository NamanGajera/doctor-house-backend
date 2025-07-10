const express = require("express");
const { serverConfig, logger, db } = require("./config");
const { Enums } = require("./utils/common");
const scheduledCrons = require("./utils/common/cron-jobs");
const { ErrorResponse } = require("./utils/common");
const morgan = require("morgan");

const { STATUS_CODE } = Enums;

const authRoute = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", authRoute);

app.use((req, res, next) => {
  ErrorResponse.message = `${req.method} ${req.path} not found`;
  ErrorResponse.statusCode = STATUS_CODE.NOT_FOUND;

  res.status(STATUS_CODE.NOT_FOUND).json(ErrorResponse);
});

app.get("/auth/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  ErrorResponse.message = err.message || "Internal Server Error";
  res.status(err.statusCode || 500).json(ErrorResponse);
});

const PORT = serverConfig.PORT || 3000;

app
  .listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
    // scheduledCrons.scheduledCrons();
  })
  .on("error", (err) => {
    console.log(`Auth Service running failed ${PORT}`);
  });

// app.listen(PORT, async () => {
//   console.log(`Auth Service running on port ${PORT}`);
//   try {
//     await db.authenticate();
//     console.log("Database connected");
//   } catch (error) {
//     console.error("DB connection failed:", error);
//   }
// });
