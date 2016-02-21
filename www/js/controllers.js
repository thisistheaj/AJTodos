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
    //angular.forEach(Todos, function (todo) {
    //  if (todo === $stateParams.todo) {
    //    $scope.todo = todo;
    //  }
    //});
    //if (angular.isUndefined($scope.currency.ticker)) {
    //  $state.go('listview');
    //}
  });
