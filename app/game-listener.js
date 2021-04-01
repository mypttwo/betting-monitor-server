"use strict";

const logger = require("./logger");

const { gameAddress } = require("./config");
const gameEventListener = require("./game-event-listener");
const gameActor = require("./game-actor");
const abi = require("./abi");

const mongoose = require("./database");

const {
  getBalance,
  getJackpot,
  getBidAddressArray,
  getDeadline,
} = require("./contract-functions/get-data");
const clear = require("./contract-functions/clear");
const extendDeadline = require("./contract-functions/extendDeadline");
const end = require("./contract-functions/end");
const setupGameEvents = require("./contract-functions/setup-events");
const restart = require("./contract-functions/restart");

const callContractMethod = require("./contract-functions/callContractMethod");

logger.info("listener is alive!");

let gameContractListener = new gameEventListener.eth.Contract(abi, gameAddress);

setupGameEvents(gameContractListener, gameActor);

// getBalance(gameActor);
// getJackpot(gameActor);
// getBidAddressArray(gameActor);
// getDeadline(gameActor);
// end(gameActor, restart);
// restart(gameActor);
// getDeadline(gameActor);
//   clear(gameActor);

let gameContractActor = new gameActor.eth.Contract(abi, gameAddress);
//  clear(gameActor, gameContractActor);

let randomDate = (start, end) =>
  new Date(start + Math.random() * (end - start));

let restartExtendGame = async (type) => {
  let bidAddressArray = await getBidAddressArray(gameActor);
  let nonAddress0List = bidAddressArray.filter(
    (bidAddress) =>
      bidAddress.localeCompare("0x0000000000000000000000000000000000000000") !=
      0
  );

  if (nonAddress0List.length > 0) {
    await end(gameActor, gameContractActor, type);
    await restart(gameActor, gameContractActor);
  } else {
    console.log("extending deadline since no one has bid...");
    console.log("bidAddressArray", bidAddressArray);
    await extendDeadline(gameActor, gameContractActor);
  }
};

let endRestartTask = async () => {
  // let endDate = new Date();
  // endDate.setHours( endDate.getHours() + 1 );
  // let rndDate = randomDate(Date.now(), endDate);
  // console.log(rndDate);
  let deadline = await getDeadline(gameActor);
  // console.log('deadline', deadline);
  let currentTime = Date.now() / 1000;
  console.log("time to deadline", deadline - currentTime);
  if (currentTime > deadline) {
    await restartExtendGame(0);
  }
};

let performTask = async () => {
  // console.log('performing task');
  clearInterval(taskRunner);

  await endRestartTask();

  await resetTaskRunner();
};

let taskRunner;

taskRunner = setInterval(performTask, 5000);

let resetTaskRunner = () => {
  taskRunner = setInterval(performTask, 5000);
};

setInterval(async () => {
  await restartExtendGame(1);
}, 5 * 60 * 1000);

// process.on("message", (msg) => {
//   console.log("Message from parent:", msg);
// });
