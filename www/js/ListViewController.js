angular.module('AJTodos.ListViewController', [])

  .controller('ListViewController', function($scope,$ionicPopup,$stateParams,$http) {
    $scope.userName = $stateParams.userName;
    $scope.data = {};

    $http({
      method: 'GET',
      url: 'http://localhost:3000/userName/' + $scope.userName
    }).then(function successCallback(response) {
      if (response.data.length > 0) {
        $scope.data = response.data[0];
      }
    }, function errorCallback() {
      alert("Error: could not connect");
    });

    $scope.$watch('data', function () {
      $http({
        method: 'POST',
        url: 'http://localhost:3000',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify($scope.data)
      }).then(function successCallback(response) {
      }, function errorCallback() {
        alert("Error: no connection, not synced");
      });
    }, true);

    $scope.remove = function(todo){
      $scope.data.data.splice($scope.data.data.indexOf(todo), 1);
    };

    $scope.add = function(item) {
      $scope.data.data.push(item);
    };

    $scope.showPopup = function() {
      $scope.temp = {};

      // Custom popup
      $ionicPopup.prompt({
        template: '<input type = "text" ng-model = "temp.model">',
        title: 'Add Item',
        subTitle: 'What do you need to do?',
        scope: $scope,

        buttons: [
          { text: 'Cancel',
            type: 'button-outline button-balanced'
          }, {
            text: '<b>Add</b>',
            type: 'button-royal',
            onTap: function(e) {
              if (!$scope.temp.model) {
                e.preventDefault();
              } else {
                $scope.add({item: $scope.temp.model,completed: false});
              }
            }
          }
        ]
      });
    };

  });
