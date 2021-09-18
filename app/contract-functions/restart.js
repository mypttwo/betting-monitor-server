"use strict";
const web3 = require("web3");

const callContractMethod = require("./callContractMethod");

const restart = async (gameActor, gameContractActor, game) => {
  let method = gameContractActor.methods.restart(
    web3.utils.toWei(`${game.amount}`),
    web3.utils.toWei(`${game.bidValue}`),
    game.gameHostAddress,
    game.interval
  );
  await callContractMethod(method, gameActor);
};

module.exports = restart;
