const orderController = require('../controllers/orderController.js');
const express = require('express');
const router = express.Router();
const auth = require('../utils/auth.js');

router.post('/placeOrder', auth.verify, orderController.placeOrder)

module.exports = router;