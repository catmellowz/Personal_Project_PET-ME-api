const express = require('express');

const ServiceController = require('../controller/service-controller');

const router = express.Router();

router.post('/service', ServiceController.addService);

module.exports = router;
