'use strict'
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      fs = require('fs'),
      // storj = require('storj.js'),
      storj = require('storj-lib'),
      api = 'https://api.storj.io',
      config = require('./config.json'),
      port = process.env.PORT || 3000,
      userCtrl = require('./userCtrl.js'),
      bucketsCtrl = require('./bucketsCtrl.js'),
      fileCtrl = require('./fileCtrl.js');

let client;

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(morgan('dev'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/******** USERS ********/
app.post('/createUser', userCtrl.createUser);

app.post('/generateKeys', userCtrl.generateKeys);

/******** BUCKETS ******/
app.get('/listBuckets', bucketsCtrl.listBuckets);

app.post('/createBucket', bucketsCtrl.createBucket);

app.post('/destroyBucket', bucketsCtrl.destroyBucket);

app.post('/listFiles', bucketsCtrl.listFiles);

/******** UPLOAD/DOWNLOAD **********/
app.post('/uploadFile', fileCtrl.upload);



app.listen(port, function() {
  console.log(`listening on port ${this.address().port}`)
})
