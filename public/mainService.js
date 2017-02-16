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
})
