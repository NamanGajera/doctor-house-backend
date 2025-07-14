require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5002,
  RABBITMQ_URL: process.env.RABBITMQ_URL || "amqp://host.docker.internal",
  JWT_SECRET: process.env.JWT_SECRET,
};
