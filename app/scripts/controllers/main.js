'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')
    .controller('MasterController', function($scope, $cookieStore, $rootScope, $state, $uibModal){
    	$rootScope.headingData = 'Dashboard';
      $scope.loggedUser = $cookieStore.get('fishreg_user_gh');
      $scope.changePassword = function () {
        $scope.passInstance = $uibModal.open({
            animation: true,
            templateUrl: 'passwordModal.html',
            size: 'md',
            scope: $scope
          });
      };

      $scope.closepass = function(){
        $scope.passInstance.dismiss('cancel');
      }


      $scope.logout = function(){
          $cookieStore.put('fishreg_user_gh', '');
          $state.go('index')
      }

    	var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    $scope.men = 0; 
      var that = this; 
    
    $scope.setSel = function (tabId) {

          $scope.men = tabId;
      };

      $scope.isSel = function (tabId) {
          return this.men === tabId;
      };

    }).controller('DashController', function($scope, $http, REMOTE, $rootScope){

    	$rootScope.headingData = 'Dashboard';
    	$scope.monthList = {}; 
    	$scope.percentage = 0.00;
    	$scope.defaulters =0;
    	$scope.jan=0, $scope.feb=0, $scope.mar=0, $scope.apr=0, $scope.may=0, $scope.jun=0, $scope.jul=0, $scope.aug=0, $scope.sep=0, $scope.oct=0, $scope.nov=0, $scope.dec=0;
      $scope.mine= 1; 
  		$scope.monthlyTotal = function(){
        $scope.total =0; $scope.totals = 0; $scope.totalL= 0; 
  			$scope.jan=0, $scope.feb=0, $scope.mar=0, $scope.apr=0, $scope.may=0, $scope.jun=0, $scope.jul=0, $scope.aug=0, $scope.sep=0, $scope.oct=0, $scope.nov=0, $scope.dec=0;
        $scope.janL=0, $scope.febL=0, $scope.marL=0, $scope.aprL=0, $scope.mayL=0, $scope.junL=0, $scope.julL=0, $scope.augL=0, $scope.sepL=0, $scope.octL=0, $scope.novL=0, $scope.decL=0;
        $scope.janT=0, $scope.febT=0, $scope.marT=0, $scope.aprT=0, $scope.mayT=0, $scope.junT=0, $scope.julT=0, $scope.augT=0, $scope.sepT=0, $scope.octT=0, $scope.novT=0, $scope.decT=0;
  			
        $http.get(REMOTE+'industrial_license_current').then(function(response) {
		        $scope.totalList = response.data;

		    angular.forEach($scope.totalList, function(value, key) {

					  	if(new Date(value.Date_issue).getMonth()==0 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.jan+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==1 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.feb+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==2 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.mar+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==3 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.apr+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==4 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.may+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==5 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.jun+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==6 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.jul+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==7 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.aug+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==8 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.sep+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==9 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.oct+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==10 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.nov+=1;
					  	}else if(new Date(value.Date_issue).getMonth()==11 && new Date(value.Date_issue).getFullYear()=='2015' ){
					  		$scope.dec+=1;
					  	}


              //license

               if(new Date(value.End_date).getMonth()>=0){
              $scope.janL+=1;
            }
             if(new Date(value.End_date).getMonth()>=1){
              $scope.febL+=1;
            }
             if(new Date(value.End_date).getMonth()>=2){
              $scope.marL+=1;
            }
             if(new Date(value.End_date).getMonth()>=3){
              $scope.aprL+=1;
            }

            if(new Date(value.End_date).getMonth()>=4){
              $scope.mayL+=1;
            }
            if(new Date(value.End_date).getMonth()>=5){
              $scope.junL+=1;
            }
            if(new Date(value.End_date).getMonth()>=6){
              $scope.julL+=1;
            }
            if(new Date(value.End_date).getMonth()>=7){
              $scope.augL+=1;
            }
            if(new Date(value.End_date).getMonth()>=8){
              $scope.sepL+=1;
            }
            if(new Date(value.End_date).getMonth()>=9){
              $scope.octL+=1;
            }
            if(new Date(value.End_date).getMonth()>=10){
              $scope.novL+=1;
            }
            if(new Date(value.End_date).getMonth()>=11){
              $scope.decL+=1;
            }

              //console.log(new Date(value.End_date).getMonth());
            

        $scope.total = $scope.jan+$scope.feb+$scope.mar+$scope.apr+$scope.may+$scope.jun+$scope.jul+$scope.aug+$scope.sep+$scope.oct+$scope.nov+$scope.dec;


					});

        //semi_industrial_license_current

            $scope.jans=0, $scope.febs=0, $scope.mars=0, $scope.aprs=0, $scope.mays=0, $scope.juns=0, $scope.juls=0, $scope.augs=0, $scope.seps=0, $scope.octs=0, $scope.novs=0, $scope.decs=0;
            $scope.janT=0, $scope.febT=0, $scope.marT=0, $scope.aprT=0, $scope.mayT=0, $scope.junT=0, $scope.julT=0, $scope.augT=0, $scope.sepT=0, $scope.octT=0, $scope.novT=0, $scope.decT=0;
          
        $http.get(REMOTE+'semi_industrial_license_current').then(function(response) {
            $scope.semiList = response.data;

        angular.forEach($scope.semiList, function(value, key) {

              if(new Date(value.Date_issue).getMonth()==0 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.jans+=1;
              }else if(new Date(value.Date_issue).getMonth()==1 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.febs+=1;
              }else if(new Date(value.Date_issue).getMonth()==2 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.mars+=1;
              }else if(new Date(value.Date_issue).getMonth()==3 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.aprs+=1;
              }else if(new Date(value.Date_issue).getMonth()==4 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.mays+=1;
              }else if(new Date(value.Date_issue).getMonth()==5 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.juns+=1;
              }else if(new Date(value.Date_issue).getMonth()==6 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.juls+=1;
              }else if(new Date(value.Date_issue).getMonth()==7 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.augs+=1;
              }else if(new Date(value.Date_issue).getMonth()==8 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.seps+=1;
              }else if(new Date(value.Date_issue).getMonth()==9 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.octs+=1;
              }else if(new Date(value.Date_issue).getMonth()==10 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.novs+=1;
              }else if(new Date(value.Date_issue).getMonth()==11 && new Date(value.Date_issue).getFullYear()=='2015' ){
                $scope.decs+=1;
              }

               if(new Date(value.End_date).getMonth()>=0){
              $scope.janT+=1;
            }
             if(new Date(value.End_date).getMonth()>=1){
              $scope.febT+=1;
            }
             if(new Date(value.End_date).getMonth()>=2){
              $scope.marT+=1;
            }
             if(new Date(value.End_date).getMonth()>=3){
              $scope.aprT+=1;
            }

            if(new Date(value.End_date).getMonth()>=4){
              $scope.mayT+=1;
            }
            if(new Date(value.End_date).getMonth()>=5){
              $scope.junT+=1;
            }
            if(new Date(value.End_date).getMonth()>=6){
              $scope.julT+=1;
            }
            if(new Date(value.End_date).getMonth()>=7){
              $scope.augT+=1;
            }
            if(new Date(value.End_date).getMonth()>=8){
              $scope.sepT+=1;
            }
            if(new Date(value.End_date).getMonth()>=9){
              $scope.octT+=1;
            }
            if(new Date(value.End_date).getMonth()>=10){
              $scope.novT+=1;
            }
            if(new Date(value.End_date).getMonth()>=11){
              $scope.decT+=1;
            }


        $scope.totals = $scope.jans+$scope.febs+$scope.mars+$scope.aprs+$scope.mays+$scope.juns+$scope.juls+$scope.augs+$scope.seps+$scope.octs+$scope.novs+$scope.decs;

          });

          //end

					$scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				  $scope.series = ['Industrial', 'Semi-Industrial'];
          $scope.colo =["#023", "#010"];
				  $scope.data = [
				    [$scope.jan, $scope.feb, $scope.mar, $scope.apr, $scope.may, $scope.jun, $scope.jul, $scope.aug, $scope.sep, $scope.oct, $scope.nov, $scope.dec],
            [$scope.jans, $scope.febs, $scope.mars, $scope.aprs, $scope.mays, $scope.juns, $scope.juls, $scope.augs, $scope.seps, $scope.octs, $scope.novs, $scope.decs]
				  ];

          $scope.data2 = [
            [$scope.janL, $scope.febL, $scope.marL, $scope.aprL, $scope.mayL, $scope.junL, $scope.julL, $scope.augL, $scope.sepL, $scope.octL, $scope.novL, $scope.decL],
            [$scope.janT, $scope.febT, $scope.marT, $scope.aprT, $scope.mayT, $scope.junT, $scope.julT, $scope.augT, $scope.sepT, $scope.octT, $scope.novT, $scope.decT]
          ];
				  $scope.onClick = function (points, evt) {
				    console.log(points, evt);
				  };


              });

		      });
  		}
    $scope.labels = ['1', '2', '3', '4'];
    $scope.series = ['Week'],
    $scope.data = [[10, 20, 30, 15]];

  	$scope.init = function(){
      /*
      $scope.monthlyTotal();

      $http.get(REMOTE+'industrial_vessel_dash/')
            .then(function(response) {
                $scope.ind_vess_total = response.data;   
            });
       $http.get(REMOTE+'semi_vessel_dash/')
            .then(function(response) {
                $scope.semi_vess_total = response.data;   
            });
       $http.get(REMOTE+'dash_vessel/')
            .then(function(response) {
                $scope.vessel_list = response.data; 
            });
        $http.get(REMOTE+'dash_semi_vessel/')
            .then(function(response) {
                $scope.semi_vessel_list = response.data; 
            });
        $http.get(REMOTE+'dash_canoes/')
            .then(function(response) {
                $scope.canoes_list = response.data;
            });
        $http.get(REMOTE+'industrial_license_dash/')
            .then(function(response) {
                $scope.industrial_license_dash = response.data;
            });
        $http.get(REMOTE+'semi_license_dash/')
            .then(function(response) {
                $scope.semi_license_dash = response.data; 
            }); */
  	}


//0201481153
    	

    }).controller('LoginController', function($scope, $state, $http, REMOTE, md5, $cookieStore){

      $scope.result = false; 
    	$scope.login = function(){

        var t = {
          username:$scope.username,
          password:md5.createHash($scope.password) 
        };
     
        $http.post(REMOTE+'login', t).then(function(response){
          console.log(response.data)
        })

    		
    	}
    }).controller('SetupController', function($scope, $rootScope, $uibModal, $http, REMOTE){
      /* initializers */
      $rootScope.headingData = 'Setup';
      $scope.temp = {};

      /* Header menu selection functions */
      $scope.tab = 1; 
      var that = this; 
      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };
      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };
      /* end of header menu selection functions*/

      /* Init function */
      $scope.init = function(){
        $http.get(REMOTE+'categories').then(function(response){
            $rootScope.categoriesList = response.data;
        }); 
        $http.get(REMOTE+'client').then(function(response){
            $rootScope.clientList = response.data;
        }); 
        $http.get(REMOTE+'login').then(function(response){
            $rootScope.userList = response.data;
        })
      }

      /* Category Modal function */
      $scope.addCategory = function () {
          $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'categoryModal.html',
            size: 'md',
            scope: $scope
          });
      };

      /* Client Modal function */

      $scope.addClient = function () {
          $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'clientModal.html',
            size: 'md',
            scope: $scope
          });
      };

      /* User Modal function */
      $scope.addUser = function () {
          $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'userModal.html',
            size: 'md',
            scope: $scope
          });
      };

      /* Close Modal function */
      $scope.closeModal = function(){
        $scope.modalInstance.dismiss('cancel');
      }

      /* save function */
      $scope.saveTemp =function(a){
        if(a==1){
          $http.post(REMOTE+'categories', $scope.temp).then(function(response){
            console.log(response.data); 
            $scope.temp = {}; 
            $scope.init(); 
            $scope.closeModal();
          })
        }else if(a==2){
          $http.post(REMOTE+'client', $scope.temp).then(function(response){
            console.log(response.data); 
            $scope.temp = {}; 
            $scope.init(); 
            $scope.closeModal();
          })
        }else if(a==3){
          $http.post(REMOTE+'login', $scope.temp).then(function(response){
            console.log(response.data); 
            $scope.temp = {}; 
            $scope.init(); 
            $scope.closeModal();
          })
        }
      }

    })
