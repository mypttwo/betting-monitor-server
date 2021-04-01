'use strict'

const callContractMethod = require('./callContractMethod');

const end = async (gameActor, gameContractActor, type) => {
  let method = gameContractActor.methods.end(type);
  await callContractMethod(method, gameActor);
}

module.exports = end;