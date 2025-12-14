const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new project inquiry
router.post('/inquiry', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all projects (Admin)
router.get('/all', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get MY projects (User)
router.get('/my-projects', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ email: req.user.email }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update status (Admin)
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
