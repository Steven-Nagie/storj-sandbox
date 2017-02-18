angular.module('app').controller('mainCtrl', function($scope, mainService) {

  $scope.buckets = [];
  $scope.files = [];

  $scope.createUser = function(email, password) {
    mainService.createUser(email, password).then(function(response) {
        console.log(response.data);
    })
  };

  $scope.generateKeys = function(email, password) {
    mainService.generateKeys(email, password).then(function(response) {
      console.log(response.data);
    })
  }

  $scope.listBuckets = function() {
    mainService.listBuckets().then(function(response) {
      console.log(response.data);
      if(Array.isArray(response.data)) {
        $scope.buckets = [];
        response.data.forEach(function(bucket) {
          $scope.buckets.push(bucket);
        })
      } else {
        $scope.buckets = [{name: 'You have no buckets'}]
      }
    })
  }

  $scope.createBucket = function(bucket) {
    console.log(bucket);
    mainService.createBucket(bucket).then(function(response) {
      console.log(response.data);
    })
  }

  $scope.destroyBucket = function(bucket) {
    mainService.destroyBucket(bucket).then(function(response) {
      console.log(response.data);
    })
  }

  $scope.listFiles = function(bucket) {
    mainService.listFiles(bucket).then(function(response) {
      if(Array.isArray(response.data)) {
        $scope.files = [];
        response.data.forEach(function(file) {
          $scope.files.push(file);
        })
      } else {
        $scope.files = [{filename: response.data}];
      }
    })
  }

});
