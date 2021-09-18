"use strict";

const { gameAddress } = require("./config");
const gameActor = require("./game-actor");
const abi = require("./abi");

const {
  getBalance,
  getJackpot,
  getBidAddressArray,
} = require("./contract-functions/get-data");
const clear = require("./contract-functions/clear");
const end = require("./contract-functions/end");
const restart = require("./contract-functions/restart");

getBalance(gameActor);
getJackpot(gameActor);
// clear(gameActor);
// end(gameActor, restart);
//getBidAddressArray(gameActor);

const destroy = () => {
  let gameContractActor = new gameActor.eth.Contract(abi, gameAddress);
  gameContractActor.methods
    .owner()
    .call()
    .then((owner) => {
      console.log("owner", owner);
    });
  gameContractActor.methods
    .destroy()
    .call()
    .then((result) => {
      console.log("destroy", result);
    })
    .catch((error) => {
      console.error("destroy error", error);
    });
};

const bid = () => {
  gameActor.eth.getAccounts().then((accountArray) => {
    console.log(`Default : ${accountArray[0]}`);
    let gameContractActor = new gameActor.eth.Contract(abi, gameAddress);

    gameContractActor.methods
      .owner()
      .call()
      .then((owner) => {
        console.log("owner", owner);
      });

    gameActor.eth.getGasPrice().then((gasPrice) => {
      console.log("gasPrice", gasPrice);
      gameContractActor.methods
        .bidValue()
        .call()
        .then((bidValue) => {
          gameContractActor.methods.bid().estimateGas(
            {
              from: accountArray[0],
              to: gameAddress,
              gas: 5000000, //35833
              gasPrice: gasPrice,
              value: bidValue,
            },
            (error, gasAmount) => {
              if (error) {
                console.error("bid estimateGas error", error);
              } else {
                console.log("bid estimateGas", gasAmount);
                if (gasAmount == 5000000) console.log("Method ran out of gas");
                gameContractActor.methods.bid().send(
                  {
                    from: accountArray[0],
                    gasPrice: gasPrice,
                    gas: gasAmount + 1000,
                    value: bidValue,
                  },
                  (error, transactionHash) => {
                    if (error) {
                      console.error("bid send error", error);
                    } else {
                      console.log("transactionHash", transactionHash);
                    }
                  }
                );
              }
            }
          );
        });
    });
  });
};

const start = async () => {
  let gameContractActor = new gameActor.eth.Contract(abi, gameAddress);
  await end(gameActor, gameContractActor, 1);
  await restart(gameActor, gameContractActor);
  console.log("game started...");
};

start();
