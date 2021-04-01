'use strict'

const Web3 = require('web3');
const {ws_apikey} = require('./config');

let gameEventListener = new Web3(
    new Web3.providers.WebsocketProvider(ws_apikey)
  );


module.exports = gameEventListener;