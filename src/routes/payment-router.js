const express = require('express');
const paymentController = require('../controller/payment-controller');
const cartController = require('../controller/cart-controller');
const uploadSlip = require('../middlewares/upload');
// const cloudinary = require('../utils/cloudinary');

const router = express.Router();

router.post(
  '/uploadslip',
  uploadSlip.single('slipImage'),
  paymentController.uploadSlipImage
);

router.post('/', paymentController.createOrder);

module.exports = router;
