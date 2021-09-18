"use strict";

const { fork } = require("child_process");
const { gameList } = require("./game-list");

const runGameListener = (game) => {
  let alive = false;
  return setInterval(() => {
    if (!alive) {
      alive = true;
      // all this drama because of https://github.com/trufflesuite/truffle/issues/3356
      // https://nodejs.org/api/child_process.html
      // https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
      let gameListener = fork("app/game-listener.js");
      gameListener.send({ game: game });
      gameListener.on("exit", (code) => {
        if (code != 0) {
          alive = false;
        }
      });
    }
  }, 3000);
};

gameList.forEach(runGameListener);

module.exports = runGameListener;
