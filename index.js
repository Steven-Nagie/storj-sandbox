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
      bucketsCtrl = require('./bucketsCtrl.js');

let client;

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(morgan('dev'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function createUser(email, password) {
  client = storj.BridgeClient(api);
  return client.createUser({
    email: email,
    password: password
  }, function(err) {
    if(err) {
      console.log(err.message);
      return err;
    }

    return "User created";
  })
}

app.post('/createUser', function(req, res, next) {
  var response = createUser(req.body.email, req.body.password);
  if (response.message) {
    res.status(500).json(response.message);
  }
  res.status(200).json(response);
})

app.post('/generateKeys', function(req, res, next) {
  var user = {email: req.body.email, password: req.body.password};
  console.log(user);
  client = storj.BridgeClient(api, {basicAuth: user});

  var keypair = storj.KeyPair();

  client.addPublicKey(keypair.getPublicKey(), function(err) {
    if (err) {
      res.status(500).json(err.message);
    }

    fs.writeFileSync('./private.key', keypair.getPrivateKey());
    res.sendStatus(200);
  })
})

app.get('/listBuckets', bucketsCtrl.listBuckets);

app.post('/createBucket', bucketsCtrl.createBucket);

app.post('/destroyBucket', bucketsCtrl.destroyBucket);

app.listen(port, function() {
  console.log(`listening on port ${this.address().port}`)
})
