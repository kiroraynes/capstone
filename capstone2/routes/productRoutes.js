const express = require('express')
const router = express.Router();
const auth = require('../utils/auth.js');
const productControllers = require('../controllers/productControllers.js');

router.post('/create', auth.verify, productControllers.createProduct);

router.get('/allProducts', productControllers.allProducts);

router.get('/activeProducts', productControllers.activeProducts);



router.get('/:productId', productControllers.singleProduct);
router.patch('/:productId', auth.verify, productControllers.updateProduct);
router.delete('/:productId',auth.verify, productControllers.archiveProduct);
router.put('/:productId',auth.verify, productControllers.unarchiveProduct);
router.get('/category/:cat', productControllers.catProducts);

module.exports = router;

