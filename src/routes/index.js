const express = require('express'); 
const flightRouter = require('./flights.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/flights', flightRouter);
}

module.exports = routerApi;