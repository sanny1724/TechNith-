const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional key if logged in
    name: { type: String, required: true },
    email: { type: String, required: true },
    projectType: { type: String, required: true },
    goal: { type: String },
    designStatus: { type: String },
    budget: { type: String },
    timeline: { type: String },
    details: { type: String },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['New', 'In Progress', 'Completed', 'Archived'], default: 'New' }
});

module.exports = mongoose.model('Project', projectSchema);
