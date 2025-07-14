const express = require("express");
const morgan = require("morgan");

const { serverConfig, db } = require("./config");
const consumers = require("./consumers/patient-consumer");
const rabbitMQ = require("./config/rabbitmq");
const { Enums } = require("./utils/common");
const { ErrorResponse } = require("./utils/common");

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


app.use((err, req, res, next) => {
  console.error(err.stack);
  ErrorResponse.message = err.message || "Internal Server Error";
  res.status(err.statusCode || 500).json(ErrorResponse);
});

const PORT = serverConfig.PORT || 5002;

async function waitForDB(maxRetries = 10, delayMs = 2000) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await db.authenticate();
      console.log("✅ Database connection established");
      return;
    } catch (err) {
      console.warn(`⏳ Waiting for DB... (${retries + 1}/${maxRetries})`);
      await new Promise(res => setTimeout(res, delayMs));
      retries++;
    }
  }
  throw new Error("❌ Could not connect to the database after several retries.");
}

app.listen(PORT, async () => {
  console.log(`Patient Service running on port ${PORT}`);
  try {
    await waitForDB();
    await rabbitMQ.connectRabbitMQ();
    console.log("[patient-service] RabbitMQ connection established");
    consumers.listenToPatientRegistered();
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
});
