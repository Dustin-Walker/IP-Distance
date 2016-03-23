'use strict';

var app = angular.module('IPDistance', []);

app.controller('IPDistanceController',
  function IPDistanceController($scope) {


  $scope.distance = function(entry, newForm){
    if (newForm.$invalid) {
      return "invalid IP address";
    } else {
      // Do the actual calculation here
      return entry.address;
    };
  };

});
