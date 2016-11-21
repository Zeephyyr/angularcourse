'use strict'
var app=angular.module('myApp.values',[]);

app.value('cache',{
    employeeList:[],
    memberTagList:[],
    filterTagList:[],
    activeTeam:{}
});