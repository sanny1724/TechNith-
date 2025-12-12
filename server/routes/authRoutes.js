const express = require('express');
const router = express.Router();
const { register, login, sendLoginOtp, verifyLoginOtp, googleLogin, forgotPassword, resetPassword, getMe, sendRegisterOtp, getUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send-register-otp', sendRegisterOtp);
router.post('/register', register);
router.post('/login', login);
router.post('/login-otp', sendLoginOtp);
router.post('/verify-otp', verifyLoginOtp);
router.post('/google', googleLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);
router.get('/users', protect, getUsers);

module.exports = router;
