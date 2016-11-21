'use strict';

var searchModule=angular.module('myApp.sync', ['ngRoute','ui.bootstrap','myApp.services','ngTagsInput']);

    searchModule.controller('SyncCtrl', ['$scope','dataService','$q',function($scope,dataService,$q) {

        $scope.tags=dataService.getMemberTags();
        if($scope.tags===0 || $scope.tags===null){
            $scope.tags=[];
        }

        var afterInit=function(){
            $scope.employees=dataService.getEmployees();

            $scope.loadTags=function($query){
                return $scope.employees.filter(function(tag){
                    return tag.job.toLowerCase().indexOf($query.toLowerCase())!=-1 ||
                        tag.name.toLowerCase().indexOf($query.toLowerCase())!=-1 ||
                        tag.grade.toLowerCase().indexOf($query.toLowerCase())!=-1 ;
                });
            };
        };

        $q.when(dataService.initEmployees())
            .then(afterInit);

        $scope.modifyTags=function(){
            dataService.storeMemberTags($scope.tags);
        };

        $scope.refresh=function(){
            var team=dataService.getActiveTeam();
            if(team && team.members!=undefined) {
                team.members.length = 0;
                for (var i = 0; i < $scope.tags.length; i++) {
                    team.members.push($scope.tags[i]);
                }
                ;
                dataService.storeActiveTeam(team);
            }
        };
    }]);