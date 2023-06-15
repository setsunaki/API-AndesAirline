const express = require('express');
const flightController = require('../controller/flights.controller');

const router = express.Router();

router.get('/:id', flightController.getById );

module.exports = router;