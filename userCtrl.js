const storj = require('storj-lib'),
      api = 'https://api.storj.io',
      fs = require('fs');

module.exports = {
  createUser: function(req, res, next) {
    client = storj.BridgeClient(api);
    return client.createUser({
      email: req.body.email,
      password: req.body.password
    }, function(err) {
      if(err) {
        return res.status(500).json(err.message);
      }

      return res.status(200).json("User created");
    })
  },

  generateKeys: function(req, res, next) {
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
  }
}
