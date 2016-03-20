angular.module('AJTodos.controllers', [])

  .controller('ListViewController', function($scope,$ionicPopup,Todos) {
    $scope.todos = Todos.all();

    $scope.remove = function(todo){
      Todos.remove(todo);
    }

    $scope.add = function(item) {
      Todos.add(item);
    }

    $scope.showPopup = function() {
      $scope.data = {}

      // Custom popup
      $ionicPopup.show({
        template: '<input type = "text" ng-model = "data.model">',
        title: 'Add Item',
        subTitle: 'What do you need to do?',
        scope: $scope,

        buttons: [
          { text: 'Cancel' }, {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function() {
              if (!$scope.data.model) {
                e.preventDefault();
              } else {
                $scope.add($scope.data.model);
              }
            }
          }
        ]
      });
    };

  })

  .controller('DetailController', function($scope,Todos,$stateParams,$state) {
    $scope.todo = $stateParams.todo;
  })

  .controller('LoginViewController', function($scope,$state,$http) {
    $scope.userName = "";
    $scope.password = "";
    $scope.wrongPw = "";

    $scope.login = function (un, pw) {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/userName/' + un
      }).then(function successCallback(response) {
        if (response.data.length > 0) {
          if (response.data[0].password === pw){
            $state.go('listview');
          } else {
            $scope.wrongPw = "Wrong Password, try again";
          }
        } else {
          $http({
            method: 'POST',
            url: 'http://localhost:3000',
            //todo: add props for adding
          }).then(function successCallback(response) {
            $state.go('listview');
          }, function errorCallback(response) {
          });
        }

      }, function errorCallback(response) {

      });
    }

  });
