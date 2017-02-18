const storj = require('storj-lib'),
      api = 'https://api.storj.io',
      fs = require('fs');

module.exports = {
  upload: function(req, res, next) {
    var keypair = storj.KeyPair(fs.readFileSync('./private.key').toString()), concurrency = 6;
    var client = storj.BridgeClient(api, {
      keyPair: keypair,
      concurrency: concurrency
    });

    

  } // END OF UPLOAD
}
