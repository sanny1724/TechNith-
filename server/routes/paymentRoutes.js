const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getKey } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/get-key', getKey);

module.exports = router;
