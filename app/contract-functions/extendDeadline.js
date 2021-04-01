'use strict'

const callContractMethod = require('./callContractMethod');

const extendDeadline = async (gameActor, gameContractActor) => {
  let method = gameContractActor.methods.extendDeadline();
  await callContractMethod(method, gameActor);
}

module.exports = extendDeadline;

