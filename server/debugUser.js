const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'technith1724@gmail.com';
        const users = await User.find({ email });

        console.log(`Found ${users.length} user(s) with email ${email}`);
        users.forEach(u => {
            console.log(`ID: ${u._id} | Name: ${u.fullName} | Role: '${u.role}'`);
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUser();
