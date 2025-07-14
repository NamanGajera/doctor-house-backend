const express = require("express");
const { serverConfig } = require("./config");
const { Enums } = require("./utils/common");
const { ErrorResponse } = require("./utils/common");
const morgan = require("morgan");

const { STATUS_CODE } = Enums;

const routers = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", routers);

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

const PORT = serverConfig.PORT || 3000;


app.listen(PORT, () => {
  console.log("API-Gateway started on port", PORT);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});
