const crons = require("node-cron");


function scheduledCrons() {
    crons.schedule("*/20 * * * *", async () => {
    });
}

module.exports = {
    scheduledCrons,
}