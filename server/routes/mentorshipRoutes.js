const express = require('express');
const router = express.Router();
const Mentorship = require('../models/Mentorship');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new mentorship request
router.post('/request', async (req, res) => {
    try {
        const newRequest = new Mentorship(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all requests (Admin)
router.get('/requests', async (req, res) => {
    try {
        const requests = await Mentorship.find().sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get MY requests (User) - Requires Auth Middleware to identify user
// We assume authMiddleware attaches `req.user`
router.get('/my-requests', authMiddleware, async (req, res) => {
    try {
        // Find requests where email matches the logged-in user's email
        const requests = await Mentorship.find({ email: req.user.email }).sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update status (Admin)
router.put('/:id', async (req, res) => {
    try {
        const updatedRequest = await Mentorship.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRequest);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
