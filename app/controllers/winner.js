"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const logger = require("../logger");
const Winner = require("../models/winner").Winner;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/all", (req, res) => {
  Winner.find({}, null)
    .sort({ jackpotId: -1 })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((error) => {
      logger.error(`${error}`);
      return res.status(500).send("Server Error");
    });
});

module.exports = router;
