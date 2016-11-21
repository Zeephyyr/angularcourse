'use strict';

var app = angular.module('myApp.teams', ['ngRoute', 'ui.bootstrap','myApp.services']);

app.controller('TeamsCtrl', ['$scope','dataService',function($scope,dataService) {
    $scope.teamsContain=function(){
        if($scope.teams){
            for(var i=0;i<$scope.teams.length;i++){
                if($scope.teams[i].name===$scope.teamName){
                    $scope.teamForm.teamName.duplicateName=true;
                    return;
                }
            }
        }
        $scope.teamForm.teamName.duplicateName=false;
    }

    $scope.teams=[];
    $scope.selectedTeam=null;
    $scope.addTeam=function(){
        if($scope.teamForm.teamName.$valid){
            $scope.teams.push({
                name:$scope.teamName,
                members:[],
                isOpened:false
            });
            $scope.teamName="";
        }
    }

    $scope.selectTeam=function(team){
        if($scope.selectedTeam!=null){
            dataService.removeMemberTags();
        };

        if(team.isOpened){
            $scope.selectedTeam=team;
            dataService.storeActiveTeam(team);

            var tags=dataService.getMemberTags();
            for(var i=0;i<$scope.selectedTeam.members.length;i++){
              tags.push($scope.selectedTeam.members[i]);
            };
            dataService.storeMemberTags(tags);

        }else if(!team.isOpened){
            $scope.selectedTeam=null;
            dataService.removeActiveTeam();
        }
    }

    $scope.getActiveMember=function(member){
        $scope.activeMember=member;
    };

    $scope.removeMember=function(member){
        var index=$scope.selectedTeam.members.indexOf(member);
        if(index>-1){
          $scope.selectedTeam.members.splice(index,1);
        };
    }
}]);

app.directive('teams',function(){
    return {
        templateUrl:function(){
            return 'common/teams/teams.tmpl.html';
        }
    }
});