'use strict'

const callContractMethod = require('./callContractMethod');

const clear = async (gameActor, gameContractActor) => {
  let method = gameContractActor.methods.clear();
  await callContractMethod(method, gameActor);
}

module.exports = clear;


