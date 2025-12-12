const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const Otp = require('../models/Otp');
const sendSMS = require('../utils/sendSMS');

exports.sendRegisterOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already exists
        const { phone } = req.body;
        let user = await User.findOne({ $or: [{ email }, { phone }] });
        if (user) {
            if (user.email === email) return res.status(400).json({ message: 'User with this email already exists' });
            if (user.phone === phone) return res.status(400).json({ message: 'User with this phone number already exists' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to DB (upsert)
        await Otp.findOneAndUpdate(
            { email },
            { otp, createdAt: Date.now() },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // DEBUG: Print OTP to console for testing without valid email config
        console.log('----------------------------------------------------');
        console.log(`[EMAIL OTP SIMULATION] To: ${email}`);
        console.log(`[EMAIL OTP SIMULATION] Code: ${otp}`);
        console.log('----------------------------------------------------');

        await sendEmail(email, 'Your Signup OTP', `Your TECHNITH verification code is: ${otp}`);

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            fullName,
            email,
            phone,
            password: hashedPassword,
        });

        await user.save();

        // Clean up OTP


        const token = generateToken(user._id);
        res.status(201).json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.password) {
            return res.status(400).json({ message: 'Please login with Google or OTP' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id);
        res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, avatar: user.avatar, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendLoginOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
        await user.save();

        await sendEmail(email, 'Your Login OTP', `Your OTP is ${otp}`);

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken(user._id);
        res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, avatar: user.avatar } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture, sub } = ticket.getPayload();

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                fullName: name,
                email,
                googleId: sub,
                avatar: picture,
                isVerified: true
            });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = sub;
            user.avatar = picture;
            await user.save();
        }

        const jwtToken = generateToken(user._id);
        res.json({ token: jwtToken, user: { id: user._id, fullName: user.fullName, email: user.email, avatar: user.avatar } });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(500).json({ message: 'Google Auth Failed', error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    // Reusing sendLoginOtp logic basically, but for clarity:
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        // DEBUG: Print OTP to console for testing without valid email config
        console.log('----------------------------------------------------');
        console.log(`[PASSWORD RESET OTP] To: ${email}`);
        console.log(`[PASSWORD RESET OTP] Code: ${otp}`);
        console.log('----------------------------------------------------');

        await sendEmail(email, 'Password Reset OTP', `Your OTP for password reset is ${otp}`);

        res.json({ message: 'OTP sent for password reset' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    // Protected route example
    // req.user is set by middleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};
