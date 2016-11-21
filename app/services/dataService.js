'use strict'
var app=angular.module('myApp.services',['myApp.values']);

app.service('dataService',['cache','$http',function(cache,$http){

    var afterInit=function(response){
        for(var i=0;i<response.data.length;i++){
            response.data[i].text=response.data[i].name
                +" | "+response.data[i].grade
                +" "+response.data[i].job;
        };
        cache.employeeList=response.data;
    };

    this.initEmployees=function() {
        if (!cache.employeeList || cache.employeeList.length === 0)
            return $http
                .get('https://raw.githubusercontent.com/javascript-awesome/angular-911/master/datasources/staff.json')
                .then(afterInit);
    };

    this.getEmployees=function(){
        return cache.employeeList;
    };

    this.storeMemberTags=function(tags){
        cache.memberTagList=tags;
    }

    this.getMemberTags=function(){
        return cache.memberTagList;
    }


    this.storeActiveTeam=function(team){
        cache.activeTeam=team;
    }

    this.getActiveTeam=function(){
        return cache.activeTeam;
    }

    this.removeActiveTeam=function(){
        cache.activeTeam=null;
    }

    this.removeMemberTags=function(){
        if(cache.memberTagList!=null){
            cache.memberTagList.length=0;
        }
    }

    this.storeFilterTags=function(filterTags){
        cache.filterTagList=filterTags;
    }

    this.getFilterTags=function(){
        return cache.filterTagList;
    }
}]);