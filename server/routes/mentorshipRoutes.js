const express = require('express');
const router = express.Router();
const { createRequest, getAllRequests, updateRequestStatus } = require('../controllers/mentorshipController');
const { protect } = require('../middleware/authMiddleware'); // Assuming we might want to protect get all

router.post('/request', createRequest);
router.get('/requests', protect, getAllRequests); // Only admin/authenticated user should see this ideally
router.put('/:id', protect, updateRequestStatus);

module.exports = router;
