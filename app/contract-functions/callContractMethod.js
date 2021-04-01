'use strict'

const logger = require('../logger');

const abi = require('../abi');
const {gameAddress} = require('../config');

const callContractMethod = async (method, gameActor, value) => {
    logger.info(`calling ${method._method.name}`);
    try {
  
        let accountArray = await gameActor.eth.getAccounts();
  
        let gasPrice = await gameActor.eth.getGasPrice();
        logger.info(`gasPrice:  ${gasPrice}`);
  
        let gasAmount = await method.estimateGas({
            from : accountArray[0],
            gas: 5000000,//35833
            gasPrice : gasPrice,
            value : value
        });
  
        let options = {
            from : accountArray[0],
            gas: gasAmount,
            gasPrice : gasPrice,
            value : value
        }
  
        let txHash;
        try {
          let receipt = await method.send(options).once('transactionHash', hash => txHash = hash);
          // await handler(gameActor);
          logger.info(`${method._method.name} TransactionReceipt ${txHash} successfuly mined`);
        } catch(e) {
          logger.error(`${method._method.name} Error:  ${JSON.stringify(e,null, 3)}`);
          if(e.message.includes('not mined within 50 blocks')) {
              const handle = setInterval(() => {
                gameActor.web3.eth.getTransactionReceipt(txHash).then((resp) => {
                if(resp != null && resp.blockNumber > 0) {
                  clearInterval(handle);
                  logger.info(`${method._method.name} TransactionReceipt ${txHash} mined in block# ${resp.blockNumber}`);
                }
              })
            });
          }
          else{
            logger.error(`exiting process ${method._method.name} error: ${JSON.stringify(e,null, 3)}`);
            process.exit(1);
          }
        }
      } catch (error) {
        logger.error(`${method._method.name} error: ${JSON.stringify(error,null, 3)}`);
    }    
  }
  
  
  module.exports = callContractMethod;
