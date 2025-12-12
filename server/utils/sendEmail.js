const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or use host/port from env
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text, // Plain text fallback
            html: text.replace(/\n/g, '<br>') // Simple conversion for now, or accept html arg
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Email send failed:', error);
    }
};

module.exports = sendEmail;
