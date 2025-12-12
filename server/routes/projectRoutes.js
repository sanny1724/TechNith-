const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');

const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

router.post('/inquiry', async (req, res) => {
    try {
        const { projectType, goal, designStatus, budget, timeline, name, email, details } = req.body;
        console.log('Project Inquiry:', req.body);

        // Save to DB
        const newProject = new Project({
            name, email, projectType, goal, designStatus, budget, timeline, details
        });
        await newProject.save();

        // Notify Admin
        const adminEmail = process.env.EMAIL_USER;
        const subject = `🚀 New Project Inquiry: ${name}`;
        const body = `
            <h3>New Project Inquiry Received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Primary Goal:</strong> ${goal}</p>
            <p><strong>Design Status:</strong> ${designStatus}</p>
            <p><strong>Budget Range:</strong> ${budget}</p>
            <hr>
            <p><strong>Additional Details:</strong><br>${details}</p>
        `;

        await sendEmail(adminEmail, subject, body);

        // Auto-reply to user
        const userSubject = `We received your project inquiry!`;
        const userBody = `
            <h3>Hi ${name},</h3>
            <p>Thanks for reaching out to TECHNITH. We have received your inquiry for a <strong>${projectType}</strong>.</p>
            <p>Our team will review your requirements and get back to you within 24 hours with a proposal or to schedule a discovery call.</p>
            <br>
            <p>Best Regards,<br>Team TECHNITH</p>
        `;
        await sendEmail(email, userSubject, userBody);

        res.status(200).json({ message: 'Inquiry sent successfully' });
    } catch (error) {
        console.error('Project Inquiry Error:', error);
        res.status(500).json({ message: 'Failed to send inquiry' });
    }
});

router.get('/all', protect, async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
