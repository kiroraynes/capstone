const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers.js');
const auth = require('../utils/auth.js');
const cartController = require('../controllers/cartController.js');


router.post('/register', usersControllers.registerUser);
router.get('/login',usersControllers.loginUser);
router.post('/addCart', auth.verify, cartController.addToCart);

module.exports = router;