const express = require('express');
const router = express.Router();
const auth = require('../utils/auth.js');
const cartController = require('../controllers/cartController.js');

// routes

router.delete('/:productId', auth.verify, cartController.removeFromCart);
router.get('/view', auth.verify, cartController.view);
router.patch('/dec/:productId', auth.verify, cartController.decreaseQuantity);
router.patch('/in/:productId', auth.verify, cartController.increaseQuantity);

module.exports = router;