'use strict'

const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");

const {url_apikey,mnemonic} = require('./config');

let gameActor = new Web3(
  new HDWalletProvider(mnemonic, url_apikey)
);

module.exports = gameActor;