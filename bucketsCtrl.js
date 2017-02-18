const storj = require('storj-lib'),
      api = 'https://api.storj.io',
      fs = require('fs');


module.exports = {
  listBuckets: function(req, res, next) {
    var keypair = storj.KeyPair(fs.readFileSync('./private.key').toString());
    let client = storj.BridgeClient(api, {keyPair: keypair});

    client.getBuckets(function(err, buckets) {
      if (err) {
        return res.status(500).json(err.message);
      }

      if (!buckets.length) {
        return res.status(200).json("You have no buckets");
      }

      return res.status(200).json(buckets);
    })
  },

  createBucket: function(req, res, next) {
    console.log(req.body.name);
    var keypair = storj.KeyPair(fs.readFileSync('./private.key').toString());
    let client = storj.BridgeClient(api, {keyPair: keypair});
    var bucketInfo = {name: req.body.name};

    client.createBucket(bucketInfo, function(err, bucket) {
      if (err) {
        return res.status(500).json(err.message);
      }

      return res.status(200).json(bucket);
    })
  },

  destroyBucket: function(req, res, next) {
    let bucketId = "";
    var keypair = storj.KeyPair(fs.readFileSync('./private.key').toString());
    let client = storj.BridgeClient(api, {keyPair: keypair});

    client.getBuckets(function(err, buckets) {
      if (err) {
        return res.status(500).json(err.message);
      }

      if (!buckets.length) {
        return res.status(200).json("You have no buckets");
      }


      buckets.forEach((bucket) => {
        if (bucket.name = req.body.name) {
          bucketId = bucket.id;
          client.destroyBucketById(bucketId, function(err) {
            if (err) {
              return res.status(500).json(err.message);
            }

            return res.status(200).json("Bucket destroyed");
          })
        }
      })
    })

  }

}
