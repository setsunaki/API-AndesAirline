const express = require('express');
const flightController = require('../controller/flights.controller');

const router = express.Router();

router.get('/:id/passanger', flightController.getById );

module.exports = router;