const express = require('express');
const paymentController = require('../controller/payment-controller');

const router = express.Router();

router.get('/', paymentController.createOrderHistory);

module.exports = router;
