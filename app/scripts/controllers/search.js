'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')
   .controller('SearchController', function($scope, $rootScope, REMOTE, $http){
   		/* set initializers */
    	$rootScope.headingData = 'Search'; // Set the header of the page
    	$scope.yearList = []; 
    	$scope.search = {};
    	var read = 1958; 
    	while(read<= parseInt(new Date().getFullYear()))
    	{
    		$scope.yearList.push(read);
    		read++;
    	}; 

    	// Initializer function
    	$scope.init = function(){
    		$http.get(REMOTE+'institution').then(function(response){
    			$scope.institutionList = response.data
    		})
    	}

    	// Call Initializer function
    	$scope.init();

    	//search function
    	$scope.searchInput = function(){
	    	$http.post(REMOTE+'schools', $scope.search).then(function(response){
	    		$scope.searchList = response.data; 
	    	})
	    }

	    //view data function

	    $scope.viewDetails = function(d){
	    	$scope.result = d; 
	    }



	});