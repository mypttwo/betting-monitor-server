'use strict'

const fs = require('fs');

const winston = require('winston');
require('winston-daily-rotate-file');

const dir = "./logs";

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const dailyRotateFiletransport = new winston.transports.DailyRotateFile({
    filename: "logs/server-%DATE%.log",
    dirname: "logs/",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d"
  });

let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all:true
    }),
    winston.format.label({
        label:'[LOGGER]'
    }),
    winston.format.timestamp({
        format:"YY-MM-DD HH:MM:SS"
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);

const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),    
    transports: [
        new winston.transports.Console({
            format: alignColorsAndTime
        }),
        dailyRotateFiletransport
    ]
});

  
  module.exports = logger;