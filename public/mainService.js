angular.module('app').service('mainService', function($http) {

  this.createUser = function(email, password) {
    return $http({
      method: 'POST',
      url: '/createUser',
      data: {
        email: email,
        password: password
      }
    })
  }

  this.generateKeys = function(email, password) {
    return $http({
      method: 'POST',
      url: '/generateKeys',
      data: {
        email: email,
        password: password
      }
    })
  }

  this.listBuckets = function() {
    return $http({
      method: 'GET',
      url: '/listBuckets',
    })
  }

  this.createBucket = function(bucket) {
    return $http({
      method: 'POST',
      url: '/createBucket',
      data: {
        name: bucket
      }
    })
  }

  this.destroyBucket = function(bucket) {
    return $http({
      method: 'POST',
      url: '/destroyBucket',
      data: {
        name: bucket
      }
    })
  }

})
