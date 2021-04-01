'use strict'

const mongoose = require('../database');

let winnerSchema = new mongoose.Schema({
    gameId : {
        type : Number
    },
    jackpotId : {
        type : Number
    },
    address : {
        type : String
    },
    jackpot : {
        type : Number
    },
    end : {
        type : Number
    }               
});

mongoose.model('Winner', winnerSchema);

module.exports = {
    Winner : mongoose.model('Winner'),
    winnerSchema
}
