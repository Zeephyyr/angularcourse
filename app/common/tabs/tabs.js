var myApp=angular.module('myApp.tabs', [
    'ngRoute',
]);


myApp.controller('TabsController',['$scope','$location',function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}])