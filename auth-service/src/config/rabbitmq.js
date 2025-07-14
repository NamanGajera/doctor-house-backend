const amqp = require("amqplib");
const { serverConfig } = require("../config");

let channel = null;
const RABBITMQ_URL = serverConfig.RABBITMQ_URL || "amqp://host.docker.internal";

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log("RabbitMQ connected ✅");
        return channel;
    } catch (error) {
        console.error("RabbitMQ connection error:", error);
    }
};

const getChannel = () => channel;

module.exports = {
    connectRabbitMQ,
    getChannel,
};