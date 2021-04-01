'use strict'

const server = require('./server');
const {port} = require('./config');
const logger = require('./logger');
const mongoose = require('./database');

require('./game-listener-manager');



server.listen(port, (error) =>{
    if(error){
        console.error(error);
        logger.error("error",`Error on server listen, ${error}`);
        process.exit(0);
    }
    logger.info(`Server started on port : ${port}`);
})