'use strict'

let mongoose = require('mongoose');
const logger = require('./logger');


const {db_pwd} = require('./config');

const uri = `mongodb+srv://mypt_one:${db_pwd}@cluster0.wptte.mongodb.net/game?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(() => {
    logger.info(`Connected to db ${uri}`)
})
.catch((error) => {
    logger.error(`Server is shutting down. Could not connect to db ${error}`);
    process.exit(0);
})

mongoose.connection.on('connected', function(){
    logger.info('DB is connected successfully')
});
mongoose.connection.on('error', function(){
    logger.error(`DB connection error`);
});
mongoose.connection.on('disconnected', function(){
    logger.info('DB is disconnected')
});

module.exports = mongoose;

// const initDBConnection = async () => {
//     try {
//         await mongoose.connect(uri); 
//         logger.info('Connected to DB!');
//         return mongoose;       
//     } catch (error) {
//         logger.error(`Shutting down ...Mongo connection error : ${error}`);
//         process.exit(1);        
//     }
// }

// mongoose.connection.on('connected', function(){
//     logger.info('DB is connected successfully')
// });
// mongoose.connection.on('error', function(){
//     logger.error(`DB connection error`);
// });
// mongoose.connection.on('disconnected', function(){
//     logger.info('DB is disconnected')
// });




// module.exports = initDBConnection();
