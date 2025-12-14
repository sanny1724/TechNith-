const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const projectRoutes = require('./routes/projectRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (origin.indexOf('localhost') !== -1 || origin.indexOf('technith.netlify.app') !== -1) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(express.json());
app.use(cookieParser());

// Fix for Google Auth Popup issues
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// Database Connection
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/blogs', require('./routes/blogRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Database Connection and Server Start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/technith', {
    serverSelectionTimeoutMS: 5000 // Keep trying to send operations for 5 seconds
})
    .then(async () => {
        console.log('MongoDB Connected');
        // FIX: Drop specific index that causes Google Login to fail for 2nd user
        try {
            await mongoose.connection.db.collection('users').dropIndex('phone_1');
            console.log('Fixed issue: Dropped unique phone index');
        } catch (e) { /* Index might not exist, ignore */ }

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1); // Exit if DB fails
    });
