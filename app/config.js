"use strict";

require("dotenv").config();

let port = process.env.PORT;
let db_pwd = process.env.DB_PWD;

let mnemonic = process.env.MNEMONIC;
let gameAddress = process.env.GAME_ADDRESS;

const url_apikey = process.env.NETWORK_SRV;
const ws_apikey = process.env.NETWORK_WSS;

module.exports = {
  port,
  db_pwd,
  url_apikey,
  ws_apikey,
  mnemonic,
  gameAddress,
};
