angular.module('app').controller('mainCtrl', function($scope, mainService) {

  $scope.createUser = function(email, password) {
    console.log('creating user controller');
    mainService.createUser(email, password).then(function(response) {
        console.log(response.data);
    })
  };

  $scope.generateKeys = function(email, password) {
    console.log('keypair controller: ', typeof(email), (password));
    mainService.generateKeys(email, password).then(function(response) {
      console.log(response.data);
    })
  }

});
