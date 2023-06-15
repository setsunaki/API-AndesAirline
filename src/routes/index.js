const express = require('express'); 
const flightRouter = require('./flights.router');

function routerApi() {
    const router = express.Router();
    router.use('/flight', flightRouter);
}

module.exports = routerApi;