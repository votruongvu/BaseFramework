GLOBAL.express = require('express');
GLOBAL.app = express();

app.use(express.logger());
app.use(express.compress());
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());


require('./data/mongoose/initDB');
require('./data/mongoose/schemas');
//require('./data/initData');
require('./routes/initRoute');



app.listen(3000);
console.log('Listening on port 3000');
