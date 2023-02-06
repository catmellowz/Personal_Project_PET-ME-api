const express = require('express');

const ServiceController = require('../controller/service-controller');

const router = express.Router();

router.post('/service', ServiceController.addService);
router.get('/service', ServiceController.getAllServices);

module.exports = router;
