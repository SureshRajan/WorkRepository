'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []);

function PhoneListController($scope) {
    $scope.phones = [
                  {
                     "name": "Samsung",
                     "snippet": "Samsung smart handset device"
                  },
                  {
                      "name": "Nexus S",
                      "snippet": "Fast just got faster with Nexus S."
                  },
                  {
                      "name": "Motorola XOOM™ with Wi-Fi",
                      "snippet": "The Next, Next Generation tablet."
                  },
                  {
                      "name": "IPad",
                      "snippet": "The Next, Next Generation tablet."
                  }
    ];

    $scope.sortByOrder = 'name';
}

function PagingController($scope) {
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.numberOfPages = function () {
        return Math.ceil($scope.data.length / $scope.pageSize);
    }
    for (var i = 0; i < 45; i++) {
        $scope.data.push("Item " + i);
    }
}

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startIndex', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


function TodoCtrl($scope) {
    $scope.todos = [
      { text: 'learn angular', done: true },
      { text: 'build an angular app', done: false }];

    $scope.addTodo = function () {
        $scope.todos.push({ text: $scope.todoText, done: false });
        $scope.todoText = '';
    };

    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function () {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function (todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };
}
    
app.controller('MockBackendController', ['$resource', '$log', function ($resource, $log) { }]);

// Mock Backend
function GetTasks($http, $scope) {
    $http.get('/api/tasks').success(function (data) {
        $scope.tasks = data;
    })
    .error(function (response) {
        $scope.tasks = response;
        $scope.message = response || "Unknown error";
    });
}

function GetUpdatedTasks($http, $scope) {
    $scope.Search = function () {
        $http.post('/api/tasks', { "data": $scope.keywords }).success(function (response) {
            $scope.result = response;
            $scope.tasks = response;
        })
        .error(function (response) {
            $scope.tasks = response || "Request Failed";
        });
    }
}