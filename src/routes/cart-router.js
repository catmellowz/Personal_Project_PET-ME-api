const express = require('express');

const CartController = require('../controller/cart-controller');

const router = express.Router();

router.post('/cart', CartController.addCart);

module.exports = router;
