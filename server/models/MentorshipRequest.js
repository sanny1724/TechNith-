const mongoose = require('mongoose');

const mentorshipRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    sessionType: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: String, required: true }, // Keeping as string for simplicity 'YYYY-MM-DD'
    timeSlot: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MentorshipRequest', mentorshipRequestSchema);
