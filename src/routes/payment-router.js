const express = require('express');
const paymentController = require('../controller/payment-controller');
const uploadSlip = require('../middlewares/upload');
// const cloudinary = require('../utils/cloudinary');

const router = express.Router();

router.patch(
  '/uploadslip',
  uploadSlip.single('slipImage'),
  paymentController.uploadSlip
);

module.exports = router;
