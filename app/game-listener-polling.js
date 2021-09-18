// "use strict";

// const logger = require("./logger");

// const gameEventListener = require("./game-event-listener");
// const gameActor = require("./game-actor");

// const {
//   getBalance,
//   getJackpot,
//   getBidAddressArray,
//   getDeadline,
//   getBiddingOpenStatus,
// } = require("./contract-functions/get-data");
// const clear = require("./contract-functions/clear");
// const extendDeadline = require("./contract-functions/extendDeadline");
// const end = require("./contract-functions/end");
// const setupGameEvents = require("./contract-functions/setup-events");
// const restart = require("./contract-functions/restart");

// const callContractMethod = require("./contract-functions/callContractMethod");

// logger.info("listener is alive!");

// let randomDate = (start, end) =>
//   new Date(start + Math.random() * (end - start));

// let restartExtendGame = async (type, gameActor, gameContractActor, game) => {
//   let bidAddressArray = await getBidAddressArray(gameContractActor);
//   let nonAddress0List = bidAddressArray.filter(
//     (bidAddress) =>
//       bidAddress.localeCompare("0x0000000000000000000000000000000000000000") !=
//       0
//   );

//   if (nonAddress0List.length > 0) {
//     await end(gameActor, gameContractActor, type);
//     await restart(gameActor, gameContractActor, game);
//   } else {
//     // let openForBidding = await getBiddingOpenStatus(gameContractActor);
//     // if (!openForBidding) {
//     //   console.error("openForBidding is false! Restarting game");
//     //   await end(gameActor, gameContractActor, 0);
//     //   await restart(gameActor, gameContractActor, game);
//     //   return;
//     // }
//     console.log("extending deadline since no one has bid...");
//     console.log("bidAddressArray", bidAddressArray);
//     await extendDeadline(gameActor, gameContractActor);
//   }
// };

// let endRestartTask = async (gameActor, gameContractActor, game) => {
//   // let endDate = new Date();
//   // endDate.setHours( endDate.getHours() + 1 );
//   // let rndDate = randomDate(Date.now(), endDate);
//   // console.log(rndDate);
//   let deadline = await getDeadline(gameContractActor);
//   // console.log('deadline', deadline);
//   let currentTime = Date.now() / 1000;
//   console.log("time to deadline", deadline - currentTime);
//   if (currentTime > deadline) {
//     await restartExtendGame(0, gameActor, gameContractActor, game);
//   } else {
//     //Check if the bidding is closed
//     // let openForBidding = await getBiddingOpenStatus(gameContractActor);
//     // if (!openForBidding) {
//     //   console.error("openForBidding is false! Restarting game");
//     //   await end(gameActor, gameContractActor, 0);
//     //   await restart(gameActor, gameContractActor, game);
//     // }
//   }
// };

// let taskRunner;

// let performTask = async (gameActor, gameContractActor, game) => {
//   // console.log('performing task');
//   try {
//     clearInterval(taskRunner);

//     await endRestartTask(gameActor, gameContractActor, game);

//     await resetTaskRunner(gameActor, gameContractActor, game);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// let resetTaskRunner = (gameActor, gameContractActor, game) => {
//   taskRunner = setInterval(
//     () => performTask(gameActor, gameContractActor, game),
//     5000
//   );
// };

// process.on("message", (msg) => {
//   let game = msg.game;
//   console.log("Setting up listener for Game :", game.address);
//   let gameContractActor = new gameActor.eth.Contract(game.abi, game.address);
//   let gameContractListener = new gameEventListener.eth.Contract(
//     game.abi,
//     game.address
//   );

//   setupGameEvents(gameContractListener, gameActor);

//   taskRunner = setInterval(
//     () => performTask(gameActor, gameContractActor, game),
//     5000
//   );

//   //ALGO
//   setInterval(async (gameActor, gameContractActor) => {
//     try {
//       if (!gameActor) {
//         gameActor = require("./game-actor");
//       }
//       if (!gameContractActor) {
//         gameContractActor = new gameActor.eth.Contract(game.abi, game.address);
//       }
//       await restartExtendGame(1, gameActor, gameContractActor, game);
//     } catch (error) {
//       console.error(error);
//       process.exit(1);
//     }
//   }, 20 * 60 * 1000);
// });
