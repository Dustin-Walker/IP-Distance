'use strict';

var app = angular.module('IPDistance', []);

app.controller('IPDistanceController',
  function IPDistanceController($scope) {

  $scope.distance = function(entry, newForm){
    if (newForm.$invalid) {
      return 0;
    } else { // newForm.$valid
      return calculateDistance(entry.address);
    };
  };

  var calculateDistance = function(word) {
    var arr = [...word];
    var differenceList = [];
    var sum = 0;
    for(var len = arr.length, i = 1; i < len; i++){
      // Calculate distance between current point and previous point
      // until the end is reached
      var val0 = parseInt(arr[i-1]);
      var x0 = 0;
      var y0 = 0;
      var val1 = parseInt(arr[i]);
      var x1 = 0;
      var y1 = 0;

      switch (val0) {
        case 0:
          x0 = 1; y0 = 0;
          break;
        case 7:
          x0 = 0; y0 = 1;
          break;
        case 8:
          x0 = 1; y0 = 1;
          break;
        case 9:
          x0 = 2; y0 = 1;
          break;
        case 4:
          x0 = 0; y0 = 2;
          break;
        case 5:
          x0 = 1; y0 = 2;
          break;
        case 6:
          x0 = 2; y0 = 2;
          break;
        case 1:
          x0 = 0; y0 = 3;
          break;
        case 2:
          x0 = 1; y0 = 3;
          break;
        case 3:
          x0 = 2; y0 = 3;
          break;
        default:
          val0 = ".";
          x0 = 0; y0 = 0;
      };

      switch (val1) {
        case 0:
          x1 = 1; y1 = 0;
          break;
        case 7:
          x1 = 0; y1 = 1;
          break;
        case 8:
          x1 = 1; y1 = 1;
          break;
        case 9:
          x1 = 2; y1 = 1;
          break;
        case 4:
          x1 = 0; y1 = 2;
          break;
        case 5:
          x1 = 1; y1 = 2;
          break;
        case 6:
          x1 = 2; y1 = 2;
          break;
        case 1:
          x1 = 0; y1 = 3;
          break;
        case 2:
          x1 = 1; y1 = 3;
          break;
        case 3:
          x1 = 2; y1 = 3;
          break;
        default:
          val1 = ".";
          x1 = 0; y1 = 0;
      };

      var dxSQ = Math.pow(Math.abs(x0-x1), 2);
      var dySQ = Math.pow(Math.abs(y0-y1), 2);
      var distanceBetweenKeys = Math.sqrt( dxSQ + dySQ );
      sum += distanceBetweenKeys;
    };

    return sum;
  };

});
