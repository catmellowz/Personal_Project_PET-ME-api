const express = require('express');

const CartController = require('../controller/cart-controller');

const router = express.Router();

router.post('/cart', CartController.addCart);
router.get('/cart', CartController.getAmount);

module.exports = router;
