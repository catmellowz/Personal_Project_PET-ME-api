const express = require('express');

const CartController = require('../controller/cart-controller');

const router = express.Router();

router.post('/cart', CartController.addCart);
router.get('/cart', CartController.getAmount);
router.get('/cart/cartItem', CartController.getCartItem);
router.delete('/cart/:serviceId', CartController.deleteCart);

module.exports = router;
