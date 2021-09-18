"use strict";

const logger = require("./logger");

const gameEventListener = require("./game-event-listener");
const gameActor = require("./game-actor");

const {
  getBidAddressArray,
  getPos,
  getDeadline,
  getBiddingOpenStatus,
} = require("./contract-functions/get-data");
const end = require("./contract-functions/end");
const setupGameEvents = require("./contract-functions/setup-events");
const restart = require("./contract-functions/restart");

logger.info("listener is alive!");

let randomDate = (start, end) =>
  new Date(start + Math.random() * (end - start));

const TIMEOUT = 0;
const ALGO = 1;

let gameContractActor;
let gameContractListener;
let game;
let timer;
//helpers
const getTimeToDeadline = async () => {
  let deadline = await getDeadline(gameContractActor);

  let currentTime = Date.now() / 1000;
  console.log("time to deadline", deadline - currentTime);

  return {
    timeToDeadline: deadline - currentTime,
    isPast: currentTime > deadline ? true : false,
  };
};

const getCurrentJackpotHolder = async () => {
  let bidAddressArray = await getBidAddressArray(gameContractActor);
  let pos = await getPos(gameContractActor);
  let holder = bidAddressArray[pos];
  let isEmpty =
    holder.localeCompare("0x0000000000000000000000000000000000000000") == 0;
  return { holder, isEmpty };
};

const checkDeadline = async () => {
  //getDeadline
  // if deadline is past end and restart
  // else reset timer to deadline
  let { timeToDeadline, isPast } = await getTimeToDeadline(gameContractActor);
  if (isPast) {
    await end(gameActor, gameContractActor, TIMEOUT);
    await restart(gameActor, gameContractActor, game);
  } else {
    clearTimeout(timer);
    timer = setTimeout(checkDeadline, timeToDeadline * 1000);
  }
};
const newBidHandler = async (error, event) => {
  // get time to deadline
  let { timeToDeadline } = await getTimeToDeadline();
  // checkDeadline after deadline
  clearTimeout(timer);
  timer = setTimeout(checkDeadline, timeToDeadline * 1000);
};

const start = async () => {
  // get current jackpot holder (cjh)
  let { isEmpty } = await getCurrentJackpotHolder();
  // if cjh is available
  // get time to deadline
  // checkDeadline after deadline
  if (!isEmpty) {
    let { timeToDeadline } = await getTimeToDeadline();
    // checkDeadline after deadline
    timer = setTimeout(checkDeadline, timeToDeadline);
  } else {
    // if cjh is not available
    //check if open for bidding; if not call start
    // else wake up in one hour
    let openForBidding = await getBiddingOpenStatus(gameContractActor);
    if (!openForBidding) {
      await restart(gameActor, gameContractActor, game);
      console.log("restarting game");
    }
    timer = setTimeout(checkDeadline, 60 * 60 * 1000);
    console.log("No bidders.Going to sleep...");
  }
};

process.on("message", (msg) => {
  game = msg.game;
  console.log("Setting up listener for Game :", game.address);
  gameContractActor = new gameActor.eth.Contract(game.abi, game.address);
  gameContractListener = new gameEventListener.eth.Contract(
    game.abi,
    game.address
  );

  setupGameEvents(gameContractListener, newBidHandler);

  start();
});
