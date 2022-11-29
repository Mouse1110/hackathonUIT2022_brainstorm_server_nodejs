
const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController')

router.get('/show', productController.show);
// router.get('/', productController.index);
router.get('/category', productController.category);
// router.get('/user-near', productController.user_near);
// router.post('/', productController.create_product);
// router.post('/buy', productController.buy_product);
// router.get('/buy/list', productController.list_buy_product);
// router.post('/buy-accept', productController.buy_accept);



module.exports = router;