"use strict";

const abi = require("../abi");
const { gameAddress } = require("../config");

const getBalance = async (gameContractActor) => {
  let owner = await gameContractActor.methods.owner().call();
  let balance = await gameContractActor.methods.getBalanceContract().call({
    from: owner,
  });
  console.log("balance", balance);
  return balance;
};

const getJackpot = async (gameContractActor) => {
  let owner = await gameContractActor.methods.owner().call();
  let jackpot = await gameContractActor.methods.getJackpot().call({
    from: owner,
  });
  console.log("jackpot", jackpot);
  return jackpot;
};

const getBidAddressArray = async (gameContractActor) => {
  let owner = await gameContractActor.methods.owner().call();
  let bidAddressArray = await gameContractActor.methods
    .getBidAddressArray()
    .call({
      from: owner,
    });
  // console.log('bidAddressArray', bidAddressArray);
  return bidAddressArray;
};

const getDeadline = async (gameContractActor) => {
  let owner = await gameContractActor.methods.owner().call();
  let deadline = await gameContractActor.methods.deadline().call({
    from: owner,
  });

  return deadline;
};

const getBiddingOpenStatus = async (gameContractActor) => {
  let owner = await gameContractActor.methods.owner().call();
  let openForBidding = await gameContractActor.methods.openForBidding().call({
    from: owner,
  });

  return openForBidding;
};

const getPos = async (gameContractActor) => {
  let owner = await gameContractActor.methods.owner().call();
  let pos = await gameContractActor.methods.pos().call({
    from: owner,
  });

  return pos;
};

module.exports = {
  getBalance,
  getJackpot,
  getBidAddressArray,
  getPos,
  getDeadline,
  getBiddingOpenStatus,
};
