var mongoose = require('mongoose');
var dburl = 'mongodb://anuradha78-homework1-5577789/meanhotel';

mongoose.connect(dburl);

mongoose.connection.on('connected', function() {
    console.log("Mongoose connected to " + dburl);
});

mongoose.connection.on('disconnected', function() {
    console.log("Mongoose disconnected");
});

mongoose.connection.on('error', function(err) {
    console.log("Mongoose connection error: " + err);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected through app termination (SIGINT)");
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected through app termination (SIGTERM)");
        process.exit(0);
    });
});
/*listen to the process once and let nodemon pick up the changes in restarting the mongodb server through mongoose*/
process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected through app termination (SIGUSR2)");
        process.kill(process.pid, 'SIGUSR2');
    });
});

//Bring in SCHEMAS and MODELS
require('./hotels.models.js');








