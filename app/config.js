'use strict'

require('dotenv').config();

let port = process.env.PORT;
let db_pwd = process.env.DB_PWD;
let infura_url_apikey = process.env.INFURA_URL_API_KEY;
let infura_ws_apikey = process.env.INFURA_WS_API_KEY;
let alchemy_url_apikey = process.env.ALCHEMY_URL_API_KEY;
let alchemy_ws_apikey = process.env.ALCHEMY_WS_API_KEY;
let provider = process.env.PROVIDER;
let mnemonic = process.env.MNEMONIC;
let gameAddress = process.env.GAME_ADDRESS;

const url_apikey = provider.localeCompare('ALCHEMY') == 0? alchemy_url_apikey : infura_url_apikey;
const ws_apikey = provider.localeCompare('ALCHEMY') == 0? alchemy_ws_apikey : infura_ws_apikey;

module.exports = {
    port,
    db_pwd,
    url_apikey,
    ws_apikey,
    mnemonic,
    gameAddress
}