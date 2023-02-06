const express = require('express');
const router = require('./cart-router');
const paymentController = require('../controller/payment-controller');
const uploadSlip = require('../middlewares/upload');

router.patch(
  '/payment/uploadslip',
  uploadSlip.single('slipImage'),
  paymentController.uploadSlip
);

module.exports = router;
