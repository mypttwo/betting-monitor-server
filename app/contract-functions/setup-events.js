'use strict'

const Winner = require('../models/winner').Winner;

const logger = require('../logger');

const setupGameEvents = (gameContractListener, gameActor) => {
    gameContractListener.events.NewCurrentBidAddress((error, event) =>{
        if(error){
            logger.error(`NewCurrentBidAddress event setup error:  ${error}`);
            logger.error(`Exiting now...`);
            process.exit(1);
        }

        logger.info(`NewCurrentBidAddress : bidAddress:  ${event.returnValues.bidAddress}`);
        logger.info(`NewCurrentBidAddress : currentJackpotValue:  ${event.returnValues.jackpot}`);
        logger.info(`NewCurrentBidAddress : pos:  ${event.returnValues.pos}`);  
        logger.info(`NewCurrentBidAddress : gameId:  ${event.returnValues.gameId}`);
        logger.info(`NewCurrentBidAddress : jackpotId:  ${event.returnValues.jackpotId}`); 

    })
    .on('error', (error) => {
        logger.error(`NewCurrentBidAddress event error:  ${error}`);
    });

    gameContractListener.events.GameEnded((error, event) =>{
        if(error){
            logger.error(`GameEnded event setup error:  ${error}`);
            logger.error(`Exiting now...`);
            process.exit(1);
        }
        logger.info(`GameEnded : jackpot:  ${event.returnValues.jackpot}`);
        logger.info(`GameEnded : winnerAddress:  ${event.returnValues.winnerAddress}`); 
        logger.info(`GameEnded : gameId:  ${event.returnValues.gameId}`);
        logger.info(`GameEnded : jackpotId:  ${event.returnValues.jackpotId}`); 
        logger.info(`GameEnded : endType:  ${event.returnValues.endType}`); 
        Winner.create({
            gameId : event.returnValues.gameId,
            jackpotId : event.returnValues.jackpotId,
            address : event.returnValues.winnerAddress,
            jackpot : event.returnValues.jackpot,
            end : event.returnValues.endType
        }).then(data => {
            logger.info(`Created Winner ${event.returnValues.winnerAddress}`);
        }).catch(error => {
            logger.error(`Could not create Winner ${error}`)
        })
    })
    .on('error', (error) => {
        logger.error(`GameEnded event error:  ${error}`);
    });
}

module.exports = setupGameEvents;