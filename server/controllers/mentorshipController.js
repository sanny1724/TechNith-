const MentorshipRequest = require('../models/MentorshipRequest');
const sendEmail = require('../utils/sendEmail');

exports.createRequest = async (req, res) => {
    try {
        console.log('Received mentorship request:', req.body);
        const { name, email, sessionType, duration, date, timeSlot, message } = req.body;

        const newRequest = new MentorshipRequest({
            name,
            email,
            sessionType,
            duration,
            date,
            timeSlot,
            message
        });

        await newRequest.save();

        // Notify Admin
        const adminEmail = 'sravssunny15@gmail.com'; // Taken from Home.jsx
        const emailSubject = `New Mentorship Request: ${sessionType}`;
        const emailBody = `
            You have received a new mentorship session request.
            
            Name: ${name}
            Email: ${email}
            Session Type: ${sessionType}
            Duration: ${duration}
            Date: ${date}
            Time Slot: ${timeSlot}
            Message: ${message}
            
            Login to Admin Panel to approve/reject.
        `;

        // We attempt to send email, but don't fail the request if email fails (unless critical)
        // We attempt to send email, but don't fail the request if email fails (unless critical)
        try {
            // Admin Notification
            const adminSubject = `📢 New Booking: ${name} - ${sessionType}`;
            const adminBody = `
                <h3>New Mentorship Request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Session:</strong> ${sessionType}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${timeSlot}</p>
                <p><strong>Duration:</strong> ${duration}</p>
                <p><strong>Message:</strong><br>${message}</p>
                <hr>
                <p>Check your dashboard for more details.</p>
            `;
            await sendEmail(adminEmail, adminSubject, adminBody);

            // User Confirmation
            const userSubject = `✅ Booking Confirmed: ${sessionType} Session`;
            const userBody = `
                <h3>Hello ${name},</h3>
                <p>Your request for a <strong>${sessionType}</strong> session has been received!</p>
                <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; color: #333;">
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> ${timeSlot}</p>
                    <p><strong>Duration:</strong> ${duration}</p>
                </div>
                <p>We will review your request and send a Google Meet link shortly.</p>
                <p>Best Regards,<br><strong>Team TECHNITH</strong></p>
            `;
            await sendEmail(email, userSubject, userBody);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Continue execution, do not fail the request
        }

        res.status(201).json({ message: 'Request submitted successfully', request: newRequest });
    } catch (error) {
        console.error('Mentorship Request Error:', error);
        res.status(500).json({ message: 'Failed to submit request', error: error.message });
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await MentorshipRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch requests' });
    }
};

exports.updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await MentorshipRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.status = status;
        const updatedRequest = await request.save();

        // Optional: Send email notification about status change
        if (status === 'Approved' || status === 'Rejected') {
            const subject = `Mentorship Request ${status}`;
            const body = `
                <h3>Hello ${request.name},</h3>
                <p>Your mentorship request for <strong>${request.sessionType}</strong> on ${request.date} at ${request.timeSlot} has been <strong>${status}</strong>.</p>
                ${status === 'Approved' ? '<p>You will receive a calendar invite shortly.</p>' : '<p>We are unable to accommodate your request at this time.</p>'}
                <br>
                <p>Best Regards,<br>Team TECHNITH</p>
            `;
            await sendEmail(request.email, subject, body);
        }

        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
