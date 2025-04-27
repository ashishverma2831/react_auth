const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const { registerUser, loginUser, getAllUsers } = require('../controllers/UserControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-all', getAllUsers);


module.exports = router;