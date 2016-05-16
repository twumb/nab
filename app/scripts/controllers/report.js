'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')
   .controller('ReportController', function($scope, $rootScope, $http, REMOTE){
    	$rootScope.headingData = 'Report'; // Set the header of the page
    	$scope.temp = {};
    	/* tab selection functions */
    	$scope.tab = 1; 
	    var that = this; 
	    $scope.setTab = function (tabId) {
	       this.tab = tabId;
	    };
	    $scope.isSet = function (tabId) {
	       return this.tab === tabId;
	    };

	    /* search function */
	    $scope.search = function(){
	    	$http.post(REMOTE+'search', $scope.temp).then(function(response){
	    		
	    	})
	    }


	});