const UserModel = require('../models/UserModel');

const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        res.json({ message: 'User registered successfully' });
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

module.exports = {
    registerUser,
    loginUser
}