var myApp=angular.module('myApp.searching', []);

myApp.directive('mySearch',function(){
    return {
        templateUrl:function(){
            return 'common/searching/my-search.tmpl.html';
        }
    }
});

