const express = require('express');

const ServiceController = require('../controller/service-controller');
const uploadSlip = require('../middlewares/upload');

const router = express.Router();

router.post(
  '/service',
  uploadSlip.single('serviceImage'),
  ServiceController.addService
);
router.get('/service', ServiceController.getAllServices);

module.exports = router;
