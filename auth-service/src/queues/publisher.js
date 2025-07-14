const rabbitMQ = require("../config/rabbitmq");

const publishDoctorCreated = async (data) => {
    const channel = rabbitMQ.getChannel();
    const queueName = "doctor.registered";

    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
        persistent: true,
    });
    console.log("Event sent to doctor service");
};

const publishPatientCreated = async (data) => {
    const channel = rabbitMQ.getChannel();
    const queueName = "patient.registered";

    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
        persistent: true,
    });
    console.log("Event sent to patient service");
};

module.exports = {
    publishDoctorCreated,
    publishPatientCreated,
};