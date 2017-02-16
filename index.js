'use strict'
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      // storj = require('storj.js'),
      storj = require('storj-lib'),
      api = 'https://api.storj.io',
      client = storj.BridgeClient(api),
      config = require('./config.json'),
      port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(morgan('dev'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

client.createUser({
  email: config.storjEmail,
  password: config.storjPassword
}, function(err) {
  if(err) {
    return console.log('error: ', err.message);
  }

  console.log('user created');
})

// var storjOptions = {
//   bridge: `http://localhost:${port}`,
//   basicAuth: {
//     email: config.storjEmail,
//     password: config.storjPassword
//   }
// }

app.listen(port, function() {
  console.log(`listening on port ${this.address().port}`)
})
