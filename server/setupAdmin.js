const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const setupAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'technith1724@gmail.com';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.findOne({ email });

        if (user) {
            console.log('User found. Updating role to ADMIN and resetting password.');
            user.role = 'admin';
            user.password = hashedPassword;
            await user.save();
        } else {
            console.log('User not found. Creating new ADMIN user.');
            user = new User({
                fullName: 'Technith Admin',
                email: email,
                phone: '0000000000',
                password: hashedPassword,
                role: 'admin',
                isVerified: true
            });
            await user.save();
        }

        console.log(`SUCCESS: Admin setup complete for ${email}`);
        console.log(`Password reset to: ${password}`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

setupAdmin();
