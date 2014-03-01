var qx = require('qooxdoo');
GLOBAL.express = require('express');
GLOBAL.app = express();
GLOBAL.authenticate = require('authenticate')
var db = require('./data/mongoose/initDB');
var schemas = require('./data/mongoose/schemas');
var routes = require('./routes/initRoute');

app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.json({strict: true}));
app.use(authenticate.middleware({
    encrypt_key: "9b73iQHDQA", // Add any key for encrypting data
    validate_key: "RDyscwMazM" // Add any key for signing data
}));

app.listen(3000);
console.log('Listening on port 3000');
