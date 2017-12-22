let itemsController = require('./controllers/items-controller');
let entireProcess = require('./controllers/entire-ETL-process-controller');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const http = require('http').Server(app);
const io = require('socket.io')(http);


mongoose.Promise = global.Promise;

app.use('/', express.static(path.join(__dirname, '../web-client')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

mongoose.connect(config.database, {useMongoClient: true});

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

app.use('/api', router);
itemsController(router, io);
entireProcess(router, io);

http.listen(8000, function () {
    console.log('Process ' + process.pid + ' is listening to all incoming requests');
});


