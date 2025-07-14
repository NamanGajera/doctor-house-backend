const rabbitMQ = require("../config/rabbitmq");
const { DoctorRepository } = require("../repositories");

const doctorRepository = new DoctorRepository();

const listenToDoctorRegistered = async () => {
    const channel = rabbitMQ.getChannel();
    const queueName = "doctor.registered";

    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async (message) => {
        if (message !== null) {
            const data = JSON.parse(message.content.toString());
            console.log("[doctor-service] Received doctor.registered =>", data);

            try {
                await doctorRepository.createDoctorFromEvent(data);
                channel.ack(message);
            } catch (error) {
                console.error("[doctor-service] Failed to process message:", error);
                channel.nack(message, false, false); // discard message
            }
        }
    });
};

module.exports = {
    listenToDoctorRegistered,
};