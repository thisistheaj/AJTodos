angular.module('AJTodos.services', [])

.factory('Todos', function() {
  try {
    var items = angular.fromJson(localStorage.getItem('todos')) || [];
    todos = items;
  } catch (e) {
    var todos = [];
  }

  function store () {
    localStorage.setItem('todos', angular.toJson(todos));
  }

  return {
    all: function() {
      return todos;
    },
    remove: function(todo) {
      todos.splice(todos.indexOf(todo), 1);
      store();
    },
    add: function(todo) {
      todos.push(todo);
      store();
    }
  };
});
