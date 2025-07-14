const rabbitMQ = require("../config/rabbitmq");
const { PatientRepository } = require("../repositories");

const patientRepository = new PatientRepository();

const listenToPatientRegistered = async () => {
    const channel = rabbitMQ.getChannel();
    const queueName = "patient.registered";

    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async (message) => {
        if (message !== null) {
            const data = JSON.parse(message.content.toString());
            console.log("[patient-service] Received patient.registered =>", data);

            try {
                await patientRepository.createPatientFromEvent(data);
                channel.ack(message);
            } catch (error) {
                console.error("[patient-service] Failed to process message:", error);
                channel.nack(message, false, false);
            }
        }
    });
};

module.exports = {
    listenToPatientRegistered,
};