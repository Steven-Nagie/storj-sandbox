angular.module('app').service('mainService', function($http) {

  this.createUser = function(email, password) {
    console.log('creating user service');
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
    console.log('keypair service');
    return $http({
      method: 'POST',
      url: '/generateKeys',
      data: {
        email: email,
        password: password
      }
    })
  }

})
