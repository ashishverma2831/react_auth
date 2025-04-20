const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const { registerUser, loginUser } = require('../controllers/UserControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;