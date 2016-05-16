'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')
   .controller('InstitutionController', function($scope, $rootScope, $http, REMOTE, $uibModal){
    	$rootScope.headingData = 'Institution'; // Set the header of the page
    	$scope.temp = {}; //
    	/* init function */
    	$scope.init = function(){
    		// institution list
    		$http.get(REMOTE+'institution').then(function(response){
    			$rootScope.institutionList = response.data;
    		}); 
    		// categories list
    		$http.get(REMOTE+'categories').then(function(response){
    			$scope.categoriesList = response.data
    		})
    	}
    	// Call init function 
    	$scope.init();

    	/* Add institution  modal function*/
    	$scope.addInstitution =function(){
	    	$scope.modalInstance = $uibModal.open({
	            animation: true,
	            templateUrl: 'institutionModal.html',
	            size: 'md',
	            scope: $scope
	          });
    	}
    	/* close modal */

    	$scope.closeModal  = function(){
    		$scope.modalInstance.dismiss('cancel');
    	}

    	/* Save institution */

    	$scope.saveInstitution = function(){
    		$http.post(REMOTE+'institution', $scope.temp).then(function(response){
    			$scope.temp = {}; 
    			$scope.closeModal(); 
    			$scope.init();
    		})
    	}
	});