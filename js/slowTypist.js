'use strict';

var app = angular.module('IPDistance', []);

app.controller('IPDistanceController',
  function IPDistanceController($scope) {


  $scope.distance = function(entry, newForm){
    if (newForm.$invalid && newForm.$pristine) {
      return "0 cm";
    } else if (newForm.$invalid && newForm.$dirty) {
      return "invalid IP address";
    } else { // newForm.$valid
      // Do the actual calculation here
      return entry.address;
    };
  };

});
