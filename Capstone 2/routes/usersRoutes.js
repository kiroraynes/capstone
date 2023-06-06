const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers.js');
const auth = require('../utils/auth.js');


router.post('/register', usersControllers.registerUser);
router.get('/login',usersControllers.loginUser);

module.exports = router;