const express = require('express');
const router = express.Router();
const auth = require('../utils/auth.js');
const cartController = require('../controllers/cartController.js');

// routes

router.delete('/:productId', auth.verify, cartController.removeFromCart);
router.get('/view/:cartId', auth.verify, orderController.view);

module.exports = router;