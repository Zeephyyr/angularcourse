'use strict';

var app = angular.module('myApp.members', ['ngRoute', 'ui.bootstrap','myApp.services']);

app.controller('MembersCtrl', ['$scope','dataService','$q',function($scope,dataService,$q) {
    var memberTags=dataService.getMemberTags();
    var team=dataService.getActiveTeam();

    var teamHasEmployee=function(id){
        team=dataService.getActiveTeam();
        if(team && team.members!=undefined){
            for(var i=0;i<team.members.length;i++){
                if(team.members[i].id===id){
                    return true;
                }
            }
        }
        return false;
    }

    var containsTag = function(array,text) {
        for(var i=0;i<array.length;i++){
            if(array[i].text===text){
                return true;
            }
        }
        return false;
    };

    var afterInit=function(){
        $scope.emplList=dataService.getEmployees();

        $scope.tags=dataService.getFilterTags();
        if($scope.tags===0){
            $scope.tags=[];
        }

        $scope.autoCompleteTags=[];

        for(var i=0;i<$scope.emplList.length;i++){
            if(!containsTag($scope.autoCompleteTags,$scope.emplList[i].name)){
                $scope.autoCompleteTags.push({text:$scope.emplList[i].name});
            };
            if(!containsTag($scope.autoCompleteTags,$scope.emplList[i].job)){
                $scope.autoCompleteTags.push({text:$scope.emplList[i].job});
            };
            if(!containsTag($scope.autoCompleteTags,$scope.emplList[i].grade)){
                $scope.autoCompleteTags.push({text:$scope.emplList[i].grade});
            }
        };

        $scope.loadTags=function($query){
            return $scope.autoCompleteTags.filter(function(tag){
                return tag.text.toLowerCase().indexOf($query.toLowerCase())!=-1;
            });
        };
    };

    $scope.currentPage=1;
    $scope.maxSize = 5;
    $scope.itemsPerPage = 10;

    $scope.$watch('currentPage + itemsPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage)
            , end = begin + $scope.itemsPerPage;

    });

    $scope.modifyTags=function(){
        dataService.storeFilterTags($scope.tags);
    };

    $scope.filterEmployees=function(employee){
        return $scope.tags.length>0 && !teamHasEmployee(employee.id) &&
            (
                containsTag($scope.tags,employee.name)
                || containsTag($scope.tags,employee.grade)
                || containsTag ($scope.tags,employee.job)
            );
    }

    $scope.addToTeam=function(employee){
        if(team && team.members!=undefined){
            employee.isShown=false;
            team.members.push(employee);
            memberTags.push(employee);

            dataService.storeActiveTeam(team);
            dataService.storeMemberTags(memberTags);
        }
    }


    $q.when(dataService.initEmployees())
        .then(afterInit);
}]);