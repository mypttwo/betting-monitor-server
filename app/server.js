'use strict'

let express = require('express')();
let cors = require('cors')();
let http = require('http');
let winnersController = require('./controllers/winner');

express.use(cors);

express.use('/winners', winnersController);

let server = http.createServer(express);

module.exports = server;
