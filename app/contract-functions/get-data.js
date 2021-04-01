'use strict'

const abi = require('../abi');
const {gameAddress} = require('../config');


const getBalance = async (gameActor) => {
    let gameContractActor = new gameActor.eth.Contract(abi, gameAddress);
    let owner = await gameContractActor.methods.owner().call();
    // console.log('owner', owner);
    let balance = await gameContractActor.methods.getBalanceContract().call({
        from :owner
    })
    console.log('balance', balance);
    return balance;
}

const getJackpot = async (gameActor) => {
    let gameContractActor = new gameActor.eth.Contract(abi, gameAddress);
    let owner = await gameContractActor.methods.owner().call();
    // console.log('owner', owner);
    let jackpot = await gameContractActor.methods.getJackpot().call({
        from :owner
    })
    console.log('jackpot', jackpot);
    return jackpot;
}

const getBidAddressArray = async (gameActor) => {
    let gameContractActor = new gameActor.eth.Contract(abi, gameAddress);
    let owner = await gameContractActor.methods.owner().call();
    // console.log('owner', owner);
    let bidAddressArray = await gameContractActor.methods.getBidAddressArray().call({
        from :owner
    })
    // console.log('bidAddressArray', bidAddressArray);
    return bidAddressArray;
}

const getDeadline = async (gameActor) => {
    let gameContractActor = new gameActor.eth.Contract(abi, gameAddress);
    let owner = await gameContractActor.methods.owner().call();
    // console.log('owner', owner);
    let deadline = await gameContractActor.methods.deadline().call({
        from :owner
    })
    

    return deadline;
}

module.exports = {getBalance, getJackpot, getBidAddressArray, getDeadline}