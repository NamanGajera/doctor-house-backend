require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5001,
  JWT_SECRET: process.env.JWT_SECRET,
  RABBITMQ_URL: process.env.RABBITMQ_URL || "amqp://host.docker.internal",
};
