const UserModel = require('../models/UserModel');
const otpgenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const sendEmail = require('../Email Service/email');

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

        // Send verification email
        const emailBody = `Hello ${req.body.username},\n\nPlease click on the link to verify your account. <b>http://localhost:3000/api/users/verify/${verificationToken}</b>\n\nThank you!`;
        await sendEmail(req.body.email, 'Email Verification', emailBody);

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

const verifyUser = async (req, res) => {
    try {
        console.log(req.params);
        const { token } = req.params;

        const isTokenValid = await UserModel.findOne({
            'verificationToken.token': token,
            'verificationToken.expires': { $gt: new Date() }
        });
        console.log(isTokenValid);

        if (!isTokenValid) {
            return res.send(`<p>Invalid or expired verification token</p> <a href="http://localhost:3000/api/users/resendverification/${token}">Resend Verification Mail</a>`);
        }

        if(isTokenValid.isVerified) {
            return res.send(`<p>Your account is already verified. Please Login</p>`);
        }

        isTokenValid.isVerified = true;
        await isTokenValid.save();
        // const user = await UserModel.findOne({ 'verificationToken.token': token });
        // if (!user) {
        //     return res.status(400).json({ message: 'Invalid or expired verification token' });
        // }

        // if (user.verificationToken.expires < new Date()) {
        //     return res.status(400).json({ message: 'Verification token has expired' });
        // }

        // user.isVerified = true;
        // user.verificationToken = undefined; // Remove the verification token after successful verification
        // await user.save();
        // res.json({ message: 'User verified successfully' });
        res.send('User verified successfully');
    } catch (error) {
        res.json({ message: error.message });
    }
}

const resendVerificationEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await UserModel.findOne({
            'verificationToken.token': token,
            'isVerified': false,
        });
        console.log(user);

        if (!user) {
            return res.status(400).send('Invalid or expired verification token');
        }
        
        const verificationToken = otpgenerator.generate(6, { upperCase: false, specialChars: false, digits: true });
        console.log(verificationToken);
        
        const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

        user.verificationToken = {
            token: verificationToken,
            expires: expires
        },

        await user.save();
        res.send('Verification email resent successfully');
        await sendEmail(user.email, 'Email Verification', `Hello ${user.username},\n\nPlease click on the link to verify your account. <b>http://localhost:3000/api/users/verify/${verificationToken}</b>\n\nThank you!`);

    } catch (error) {
        res.json({ message: error.message });  
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    verifyUser,
    resendVerificationEmail
}