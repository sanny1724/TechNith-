const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const users = await User.find({}, 'email fullName role');
        console.log('--- Registered Users ---');
        users.forEach(u => console.log(`${u.fullName} | ${u.email} | ${u.role}`));
        console.log('------------------------');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listUsers();
