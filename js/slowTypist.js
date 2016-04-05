'use strict';

var app = angular.module('IPDistance', []);

app.controller('IPDistanceController',

	function IPDistanceController($scope) {

		$scope.entry = {};
		$scope.entry.address = "";
		$scope.addressList = {};
		$scope.addressList.sum = 0;
		$scope.fileSignal = false;
		$scope.distance = function (entry, newForm) {
			if (newForm.$invalid) {
				return 0;
			} else {
				return calculateDistance(entry.address);
			}
		};

		//noinspection UnterminatedStatementJS,UnterminatedStatementJS
		var calculateDistance = function (word) {
			// var arr = [...word];
			var arr = word.split('');
			var sum = 0;
			for (var len = arr.length, i = 1; i < len; i++) {
				// Calculate distance between current point and previous point
				// until the end is reached
				var val0 = parseInt(arr[i - 1]);
				var x0 = 0;
				var y0 = 0;
				var val1 = parseInt(arr[i]);
				var x1 = 0;
				var y1 = 0;

				switch (val0) {
					case 0:
						x0 = 1;
						y0 = 0;
						break;
					case 1:
						x0 = 0;
						y0 = 3;
						break;
					case 2:
						x0 = 1;
						y0 = 3;
						break;
					case 3:
						x0 = 2;
						y0 = 3;
						break;
					case 4:
						x0 = 0;
						y0 = 2;
						break;
					case 5:
						x0 = 1;
						y0 = 2;
						break;
					case 6:
						x0 = 2;
						y0 = 2;
						break;
					case 7:
						x0 = 0;
						y0 = 1;
						break;
					case 8:
						x0 = 1;
						y0 = 1;
						break;
					case 9:
						x0 = 2;
						y0 = 1;
						break;
					default:
						val0 = ".";
						x0 = 0;
						y0 = 0;
				}
				switch (val1) {
					case 0:
						x1 = 1;
						y1 = 0;
						break;
					case 1:
						x1 = 0;
						y1 = 3;
						break;
					case 2:
						x1 = 1;
						y1 = 3;
						break;
					case 3:
						x1 = 2;
						y1 = 3;
						break;
					case 4:
						x1 = 0;
						y1 = 2;
						break;
					case 5:
						x1 = 1;
						y1 = 2;
						break;
					case 6:
						x1 = 2;
						y1 = 2;
						break;
					case 7:
						x1 = 0;
						y1 = 1;
						break;
					case 8:
						x1 = 1;
						y1 = 1;
						break;
					case 9:
						x1 = 2;
						y1 = 1;
						break;
					default:
						val1 = ".";
						x1 = 0;
						y1 = 0;
				}
				var dxSQ = Math.pow(Math.abs(x0 - x1), 2);
				var dySQ = Math.pow(Math.abs(y0 - y1), 2);
				sum += Math.sqrt(dxSQ + dySQ);
			}
			return sum;
		};

		$scope.keypadEntry = function (concatValue) {
			if (!$scope.entry.address) {
				var text = $("#address").val();
				if (text == "") {
					$scope.entry.address = "";
				} else {
					$scope.entry.address = text;
				}
			}
			return $scope.entry.address = $scope.entry.address.concat(concatValue);
		};

		$scope.resetKeypad = function () {
			return $scope.entry.address = "";
		};

		$scope.keypadDelete = function () {
			var inputBox = $('#address')[0];
			if (!$scope.entry.address && inputBox.value == "")return;
			var cursorStartPosition = inputBox.selectionStart;
			var cursorEndPosition = inputBox.selectionEnd;
			if (cursorStartPosition != cursorEndPosition) {
				// Selection highlighted, delete entire highlighted field
				if (cursorStartPosition == 0 && cursorEndPosition == inputBox.value.length) {
					return $scope.resetKeypad();
				}
				if (cursorStartPosition == 0) {
					return $scope.entry.address = inputBox.value.slice(inputBox.selectionEnd, inputBox.value.length);
				}
				if (cursorEndPosition == inputBox.value.length) {
					return $scope.entry.address = inputBox.value.slice(0, cursorStartPosition);
				}
				return $scope.entry.address = inputBox.value.slice(0, cursorStartPosition) + inputBox.value.slice(cursorEndPosition, inputBox.value.length);
			} else {
				// No selection highlighted, delete one character behind cursor
				if (cursorStartPosition == 0)
					return; // Do nothing
				return $scope.entry.address = inputBox.value.slice(0, cursorStartPosition - 1) + inputBox.value.slice(cursorStartPosition, inputBox.value.length);
			}
		};

		$scope.keypadAdd = function (address) {
			// Only enabled when the entry field is valid
			if (!(address in $scope.addressList)) {
				$scope.addressList[address] = {"ip": address, "distance": calculateDistance(address)};
				$scope.addressList.sum += $scope.addressList[address].distance;
			}
		};

		$scope.removeFromList = function (record) {
			$scope.addressList.sum -= $scope.addressList[record.ip].distance;
			delete $scope.addressList[record.ip];

		};

		$scope.fileSave = function () {
			// Add some kind of verification here
			// http://getbootstrap.com/javascript/#modals - Use this
			var jsonText = JSON.stringify($scope.addressList);
			var file = new Blob([jsonText], {type: "text/plain;charset=utf-8"});
			saveAs(file, "IP-Distance-List.json");

		};

		$scope.enableUseKey = function () {
			$scope.fileSignal = true;

		};

		$scope.fileLoad = function () {
			var file = $('#upload')[0].files[0];
			var reader = new FileReader;
			reader.readAsText(file);
			reader.addEventListener("load", function (event) {
				$scope.addressList = JSON.parse(event.target.result);
				$scope.$apply();
				// alert(jsonFile.sum);
				// File validation should be performed here
			});
		}

	});