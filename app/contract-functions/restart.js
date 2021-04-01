"use strict";

const abi = require("../abi");
const { gameAddress } = require("../config");

const callContractMethod = require('./callContractMethod');

const restart = async (gameActor, gameContractActor) => {
  let method = gameContractActor.methods.restart(
    "2300000000000000",
    "0x05a538A4Dc2917FbB5ef5c29aA41001B2b545Ef2",
    240
  );
  await callContractMethod(method, gameActor, 2300000000000000);
}

module.exports = restart;
