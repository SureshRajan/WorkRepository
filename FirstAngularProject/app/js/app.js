'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'ngResource']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/1partial1.html'});
    $routeProvider.when('/view2', {templateUrl: 'partials/2partial2.html'});      
    $routeProvider.when('/PhoneList', { templateUrl: 'partials/3phoneList.html', controller: 'PhoneListController' });
    $routeProvider.when('/PhoneListFilter', { templateUrl: 'partials/4FilterphoneList.html', controller: 'PhoneListController' });
    $routeProvider.when('/2WayDataBinding', { templateUrl: 'partials/6TwoWayDataBindingSample.html', controller: 'PhoneListController' });
    $routeProvider.when('/Paging', { templateUrl: 'partials/5Paging.html', controller: 'PagingController' });
    $routeProvider.when('/ValueFromController', { templateUrl: 'partials/7ValueFromController.html', controller: 'TodoCtrl' });
    $routeProvider.when('/MockBackend', { templateUrl: 'partials/8MockBackend.html', controller: 'MockBackendController' });
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);

// Mock Backend
var myAppDev = angular.module('resourceTestDev', ['myApp', 'ngMockE2E']);

myAppDev.run(function ($httpBackend, $log) {

    var tasks = [{ id: 1, description: "Clean the house" }, { id: 2, description: "Take a nap" }]

    $httpBackend.whenGET('/api/tasks').respond(tasks);

    $httpBackend.whenPOST('/api/tasks').respond(function (method, url, data) {

        var newTask = angular.fromJson(data);
        newTask.id = tasks.length + 1;
        tasks.push(newTask);

        $log.info(tasks);

        return [200, newTask];
    });

    // The server will send GET requests for these template htmls. But he can fetch them, so we let them pass through.
        
    $httpBackend.whenGET('partials/1partial1.html').passThrough();
    $httpBackend.whenGET('partials/2partial2.html').passThrough();
    $httpBackend.whenGET('partials/3phoneList.html').passThrough();
    $httpBackend.whenGET('partials/4FilterPhoneList.html').passThrough();
    $httpBackend.whenGET('partials/5Paging.html').passThrough();
    $httpBackend.whenGET('partials/6TwoWayDataBindingSample.html').passThrough();
    $httpBackend.whenGET('partials/7ValueFromController.html').passThrough();
    $httpBackend.whenGET('partials/8MockBackend.html').passThrough();
});
