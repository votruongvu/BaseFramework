/**
 * Created by jamesvo on 22/02/14.
 */
var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/mydb';

var dbOptions = {
    'user' : 'db_username',
    'pass' : 'db_password'
};

//mongoose.connect(dbURI,dbOptions);
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
//James Vo : when nodejs application stop,this below will close db connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});


