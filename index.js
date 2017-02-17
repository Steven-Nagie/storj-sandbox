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

function createUser(email, password) {
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
  console.log(req.body);
  var response = createUser(req.body.email, req.body.password);
  if (response.message) {
    res.status(500).json(response.message);
  }
  res.status(200).json(response);
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
