const express = require('express');
const paymentController = require('../controller/payment-controller');
const cartController = require('../controller/cart-controller');
const uploadSlip = require('../middlewares/upload');

const router = express.Router();

router.post(
  '/uploadslip',
  uploadSlip.single('slipImage'),
  paymentController.uploadSlipImage
);

router.post('/', paymentController.createOrder);

router.delete('/', cartController.clearCart);

router.get('/', paymentController.createOrderHistory);

router.get('/admin', paymentController.orderAdmin);

router.put('/status', paymentController.statusOrder);

module.exports = router;
