const UserModel = require('../models/UserModel');
const otpgenerator = require('otp-generator');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        // console.log(req.body);
        const isUserExist = await UserModel.findOne({ email: req.body.email });
        if (isUserExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const verificationToken = otpgenerator.generate(6, { upperCase: false, specialChars: false, digits: true });
        const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration
        
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Save the user with hashed password
        const newUser = await UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            verificationToken: {
                token: verificationToken,
                expires: expires
            },
        });
        console.log(newUser);
        await newUser.save();
        res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        res.json({ message: 'User logged in successfully' });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
}