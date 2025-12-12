const twilio = require('twilio');

const sendSMS = async (to, message) => {
    try {
        // Basic formatting to ensure E.164 format if possible, or just pass through
        // Assumes 'to' is like '+919876543210'

        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
            console.log('----------------------------------------------------');
            console.log(`[SMS SIMULATION] To: ${to}`);
            console.log(`[SMS SIMULATION] Message: ${message}`);
            console.log('----------------------------------------------------');
            return;
        }

        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        });
        console.log(`SMS sent to ${to}`);
    } catch (error) {
        console.error('Twilio SMS Error:', error.message);
        // Fallback for dev/demo if keys are invalid
        console.log('----------------------------------------------------');
        console.log(`[SMS SIMULATION - FALLBACK] To: ${to}`);
        console.log(`[SMS SIMULATION - FALLBACK] Message: ${message}`);
        console.log('----------------------------------------------------');
    }
};

module.exports = sendSMS;
