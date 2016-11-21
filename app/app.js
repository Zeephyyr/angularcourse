'use strict'

// Declare app level module which depends on views, and components
var myApp=angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.tabs',
    'myApp.version',
    'myApp.values',
    'myApp.services',
    'myApp.sync',
    'myApp.members',
    'ngTagsInput',
    'myApp.teams',
    'myApp.searching'
]);

myApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider
      .when('/sync', {
        templateUrl: 'sync/sync.tmpl.html',
        controller: 'SyncCtrl'
      })
      .when('/members', {
          templateUrl: 'members/members.tmpl.html',
          controller: 'MembersCtrl'
      })
      .otherwise({redirectTo: '/sync'});
}]);

