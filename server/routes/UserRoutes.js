const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const { registerUser, loginUser, getAllUsers, verifyUser, resendVerificationEmail } = require('../controllers/UserControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-all', getAllUsers);
router.get('/verify/:token',verifyUser); 
router.get('/resendverification/:token', resendVerificationEmail);


module.exports = router;