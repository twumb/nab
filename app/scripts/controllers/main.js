'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')
   .controller('AlertsCtrl', function($scope, $rootScope){

    	$rootScope.headingData = 'Dashboard';

    	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };




    	$scope.alerts = [{
        type: 'success',
        msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
    }, {
        type: 'danger',
        msg: 'Found a bug? Create an issue with as many details as you can.'
    }];

    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    }).
    controller('MasterCtrl', function($scope, $cookieStore, $rootScope, $state, $uibModal){
    	$rootScope.headingData = 'Dashboard';

      $scope.loggedUser = $cookieStore.get('fishreg_user_gh');

      $scope.changePassword = function () {
      $scope.passInstance = $uibModal.open({
          animation: true,
          templateUrl: 'passwordModal.html',
          controller: 'MasterCtrl',
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

    }).controller('SetupCtrl', function($scope,$uibModal, $http , REMOTE, $rootScope){

    	$scope.member ={};

    	$rootScope.headingData = 'Setup';
    	$scope.init = function(){

    			$scope.list()
    	}

    	$scope.newSetup = function (size) {
			$scope.modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'newMemberModal.html',
		      controller: 'SetupCtrl',
		      size: 'md',
		      scope: $scope
		    });
  		};



  $scope.closeMemberModal =function(){
      $scope.modalInstance.dismiss('cancel');
  }

  $scope.ok = function(){

    $scope.closeMemberModal();
  }

  $scope.list = function(){
  		$http.get(REMOTE+'sanctuary').then(function(response) {
		        $rootScope.sanctuaryList = response.data;
		           
		    });
  }

  $scope.create = function(){
    		$http.post(REMOTE+'sanctuary',  $scope.member).then(function(response) {
		        alert('Saved');
		        $scope.member = {};
		        $scope.closeMemberModal(); 
		        $scope.init();
		        
		    });
    	}

    }).controller('EnteriesCtrl', function($scope, $http, REMOTE, $rootScope){

    	$rootScope.headingData = 'Contributions';
    	$scope.list = {};
    	$scope.sanc = {};
    	$scope.tot = 0;
    	 $scope.listed = function(){
    		$http.get(REMOTE+'sanctuary').then(function(response) {
		        $scope.sanctuaryList = response.data;
		           
		    });
    	}; 

    	$scope.save = function(){
    		$http.post(REMOTE+'entry',  $scope.sanc).then(function(response) {
		        alert('Saved');
		        $scope.sanc = {};
		        $scope.init();
		       
		    });
    	}

    	$scope.init = function(){
    		$scope.listed();
    		$scope.listenter();
    	}



    }).controller('DashCtrl', function($scope, $http, REMOTE, $rootScope){

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

  	$scope.init = function(){

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
            });
  	}


//0201481153
    	

    }).controller('LoginCtrl', function($scope, $state, $http, REMOTE, md5, $cookieStore){

      $scope.result = false; 
    	$scope.login = function(){

        var t = {
          username:$scope.username,
          password:md5.createHash($scope.password) 
        };
     
        $http.post(REMOTE+'login', t).then(function(response){
          if(response.data[0].total ===0){
              $scope.result=true; 
              $scope.username = '';
              $scope.password = '';
              document.getElementById('username').focus();
             
          }else if(response.data[0].total ===1){
              console.log(response.data[0])
              $scope.result= false;
              $cookieStore.put('fishreg_user_gh', $scope.username);
              $scope.username=''; 
              $scope.password ='';
              $state.go('app.dashboard');
          }
        })

    		
    	}
    })


//Begning of proper

.controller('SemiIndustrialCtrl', function($scope, $rootScope, $http, REMOTE, $uibModal, usSpinnerService, Upload){
    $rootScope.headingData = 'Semi-Industrial Vessels';
          $scope.loadAmount = 0; 
          $scope.loadAmountStatus = 0; 
          $scope.loadAmountEvidence = 0;
          $scope.replacement = {};
          $scope.uploadEvidenceFile = function (file) {
              Upload.upload({
                  url: REMOTE+'evidencefile',
                  data: {file: file, 'username':'userFile' }
              }).then(function (resp) {
                  $scope.replacement.evidence = REMOTE+'uploads/'+resp.data;
              }, function (resp) {
                  console.log('Error status: ' + resp.status);
              }, function (evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  $scope.loadAmountEvidence = progressPercentage;
              });
          };




             //sorting semi-industrial
              $scope.viewby = 10;
              $scope.itemsPerpageManager = 10;
              $scope.itemsPerpageCanoe = 10;
              $scope.itemsPerpageLicense = 10;
              $scope.itemsPerpageTracking = 10;
              $scope.maxSize = 5; //Number of pager buttons to show


              $scope.currentPage = 1;
              $scope.currentManager = 1; 
              $scope.currentVessel = 1; 
              $scope.currentLicense = 1; 
              $scope.currentTracking = 1; 
              $scope.numPerPage = 9;
              $scope.maxSize = 5;

              $scope.currentPage = 1;
              $scope.pageSize = 10;

              $scope.sortType     = 'Vessel_id'; // set the default sort type
              $scope.sortVessel   = 'V';
              $scope.sortLicense  ='License_id'; 
              $scope.sortReverse  = false;  // set the default sort order
              $scope.sortVesselReverse = false; 
              $scope.sortLicenseReverse = false; 

              //semi-industrial checkList
              $scope.checkList = {
                    managers :[], 
                    vessels:[], 
                    licenses:[], 
                    tracking:[]
                };

  // semi-industrial print

              function buildTableBody(data, columns) {
                  var body = [];
                  body.push( $scope.pdfHeading);
                  data.forEach(function(row) {
                      var dataRow = [];
                      columns.forEach(function(column) {
                          dataRow.push(row[column].toString());
                      })
                      body.push(dataRow);
                  });
                  return body;
              }

              function table(data, columns) {
                  return {
                      table: {
                          headerRows: 1,
                          body: buildTableBody(data, columns)
                      }
                  };
              }

              $scope.PDFprinter = function(){

                if($scope.pdfType=='Manager'){
                 var master =  ['Manager_id', 'Name_Manager', 'Phone_number', 'finalTotal'];
                $scope.pdfHeading = ["Manager ID", "Name of Manager", "Phone Number", "Vessels"];

                    angular.forEach($scope.exportdata, function(value, key){
                        if(value.Manager_id==null)
                        {
                            value.Manager_id='-'; 
                        }
                        if(value.Name_Manager==null){
                            value.Name_Manager='-';
                        }
                        if(value.Phone_number==null){
                          value.Phone_number ='-';
                        }
                        if(value.finalTotal==null){
                          value.finalTotal = '-';
                        }
                        
                    });
                }else if($scope.pdfType=='Vessels'){
                  var master =  ['VD', 'Manager_id', 'Region', 'Landing_site', 'Current_vessel_name', 'Date_registration', 'total'];
                $scope.pdfHeading = ["Vessel ID", "Manager ID", "Coastal Region", "Landing Site", "Current Vessel Name", "Registration", "License"];

                    angular.forEach($scope.exportdata, function(value, key){
                        if(value.Vessel_id==null)
                        {
                            value.Vessel_id='-'; 
                        }
                        if(value.Region==null){
                            value.Region ='-';
                        }
                        if(value.Landing_site==null){
                          value.Landing_site ='-';
                        }
                        if(value.Current_vessel_name==null){
                          value.Current_vessel_name = '-';
                        }
                        if(value.Date_registration==null){
                          value.Date_registration = '-';
                        }else{
                          value.Date_registration = value.Date_registration.slice(0, -14);
                        }
                        if(value.total==null){
                          value.total= '-';
                        }
                        //value.Date_registration = value.Date_registration.slice(0, -14);
                    });

                }else if($scope.pdfType =='License'){
                  var master =  ['License_id', 'Vessel_id', 'Name', 'Starting_date', 'End_date', 'Date_issue'];
                  $scope.pdfHeading = ["License ID", "Vessel ID", "Agreement Type", "Start Date", "End Date", "Issue Date"];
                    //console.log($scope.exportdata)
                    angular.forEach($scope.exportdata, function(value, key){
                        if(value.License_id==null)
                        {
                            value.License_id ='-'; 
                        }
                        if(value.Vessel_id==null){
                            value.Vessel_id ='-';
                        }
                        if(value.Name==null){
                          value.Name ='-';
                        }
                        if(value.Starting_date==null){
                          value.Starting_date = '-';
                        }else{
                          value.Starting_date  = value.Starting_date.slice(0, -14);
                        }
                        if(value.End_date==null){
                          value.End_date= '-';
                        }else{
                             value.End_date = value.End_date.slice(0, -14);
                        }
                        if(value.Date_issue==null){
                          value.Date_issue= '-';
                        }else{
                            value.Date_issue = value.Date_issue.slice(0, -14)
                        }
                    });

                }else if($scope.pdfType=='Tracking'){
                    var master =  ['Vessel_id', 'V', 'Change_type', 'Change_date', 'Change_description'];
                  $scope.pdfHeading = ["Vessel ID", "Change Type", "Change Date", "Change Description"];
                    angular.forEach($scope.exportdata, function(value, key){
                        if(value.Vessel_id==null)
                        {
                            value.Vessel_id ='-'; 
                        }
                        if(value.Change_type==null){
                            value.Change_type ='-';
                        }
                        if(value.Change_description==null){
                          value.Change_description ='-';
                        }
                        if(value.Change_date==null){
                          value.Change_date = '-';
                        }else{
                          value.Change_date  = value.Change_date.slice(0, -14);
                        }
                        
                    });
                }




          var docDefinition = {
              content: [
                  { text: 'Dynamic parts', style: 'header' },
                  table($scope.exportdata, master)

              ]
          }

           pdfMake.createPdf(docDefinition).download('something.pdf')
     }
 
  
  //Date functions
      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };
      $scope.open3 = function() {
        $scope.popup3.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };
      $scope.popup3 = {
        opened: false
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];


  $scope.status = function(d)
      {
            console.log(d);
            $scope.statusHeader = d.Vessel_id;
            $scope.vessel_id = d.Vessel_id;
            $scope.statusModalInstance = $uibModal.open({
              animation: true, 
              templateUrl:'statusModal.html', 
              controller:'SemiIndustrialCtrl', 
              size:'md', 
              scope:$scope
          })
      }; 

  $scope.closestatus = function(){
        $scope.statusModalInstance.dismiss('cancel');
      }

     $scope.statusChange = {};

          $scope.saveStatus =function(){
           
          var th = {
              statement: "Active_vessel ='"+$scope.statusChange.Change_type+"'", 
              Vessel_id: $scope.vessel_id, 
              Change_type: '8', 
              Change_description: $scope.statusChange.Change_description, 
              Change_date: $scope.statusChange.Change_date
          }


          $http.put(REMOTE+'semi_vessel/'+ $scope.vessel_id, th).then(function(response){
              $scope.closestatus();
              $scope.init();
          }); 

        }

    //new manager

            $scope.showVessel = function(n){
             
          $scope.statusHeader = n.Name_Manager;
          $scope.company = n.Company_id;
          $scope.selectedVessels = []; 
          $scope.replaceList = [];
          $scope.allVessels = [];

          //$scope.industrial_vessel_all 

          angular.forEach($scope.semi_vessel_all, function(value, key){
              if(value.Manager_id===n.Manager_id){
                  $scope.allVessels.push(value)
              }
          }); 

          angular.forEach($scope.semi_vessel, function(value, key){
              if(value.Manager_id===n.Manager_id){
                  $scope.selectedVessels.push(value)
              }
          }); 

          angular.forEach($scope.replacementHistory, function(value, key){
            
              if(value.owner===n.Company_id){
                  $scope.replaceList.push(value)
              }
          }); 


          //console.log($scope.selectedVessels)
          $scope.statusModalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'numberofVessel.html',
                  controller: 'IndustCtrl',
                  size: 'md',
                  scope: $scope
                });
          }

          $scope.closestatus = function(){
                $scope.statusModalInstance.dismiss('cancel');
          }



    $scope.semivessel_manager = function(){

      $scope.manager = {};
      $scope.managertext = 'New Vessel Manager';
      $scope.manager_button = 'Save';   
      $scope.read_manager = false;    
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'semivessel_managerModal.html',
            controller: 'SemiIndustrialCtrl',
            size: 'md',
            scope: $scope
      });
    };

    $scope.closeModal = function(){
      $scope.modalInstance.dismiss('cancel');   
    }

    $scope.edit_semi_manager = function(d){
      $scope.manager = d;
      $scope.managertext = d.Manager_id;
      $scope.manager_button = 'Update';   
      $scope.read_manager = false; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'semivessel_managerModal.html',
            controller: 'SemiIndustrialCtrl',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_semi_manager = function(d){
      $scope.manager = d;
      $scope.managertext = d.Manager_id;
      $scope.read_manager = true; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'semivessel_managerModal.html',
            controller: 'SemiIndustrialCtrl',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.managerSelect = function(){
        if($scope.manager_select){
           $scope.checkList.managers = angular.copy($scope.semi_manager);
        }else{
          $scope.checkList.managers = []; 
        }
      }; 


    $scope.deleteManager = function(){
        if($scope.checkList.managers.length<1){
            $scope.alertText = 'Select a manager before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.managers.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };

        //Semi-industrial export manager
        $scope.exportManager = function(){
          $scope.pdfType = 'Manager';
            if($scope.checkList.managers.length<1){
              $scope.alertText = 'Select a manager before you can export'; 
              $scope.modalAlert = $uibModal.open({
                    animation: true,
                    templateUrl: 'alertModal.html',
                    controller: 'SemiIndustrialCtrl',
                    size: 'sm',
                    scope: $scope
                  });

          }
          else{
            $scope.exportdata = $scope.checkList.managers; 
            $scope.modalExport = $uibModal.open({
                    animation: true,
                    templateUrl: 'exportModal.html',
                    controller: 'SemiIndustrialCtrl',
                    size: 'sm',
                    scope: $scope
                  });     
          }
        }; 

      //new vessel

       $scope.new_vessel = function(d){
        console.log(d);

        $scope.newvessel = {};
        $scope.newvessel.Manager_id = d.Manager_id;
        $scope.vesseltext = 'New Semi-Industrial Vessel';
        $scope.vessel_button = 'Save';
        $scope.read_vessel = false;
        $scope.semivesselModal = $uibModal.open({
            animation: true, 
            templateUrl:'new_vesselModal.html', 
            controller:'SemiIndustrialCtrl', 
            size:'md', 
            scope:$scope
        })

      }; 

      $scope.closevesselModal = function(){
        $scope.semivesselModal.dismiss('cancel');
      }

      // vessel things
      $scope.edit_semi_vessel = function(d){
      $scope.newvessel = d;
      $scope.vesseltext = d.VD;
      $scope.vessel_button = 'Update';   
      $scope.read_vessel = false; 
      $scope.semivesselModal = $uibModal.open({
            animation: true,
            templateUrl: 'new_vesselModal.html',
            controller: 'SemiIndustrialCtrl',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_semi_vessel = function(d){
      //console.log(d);
      $scope.newvessel = d;
      $scope.vesseltext = d.VD;
      //$scope.manager_button = 'Update';   
      $scope.read_vessel = true; 
      $scope.semivesselModal = $uibModal.open({
            animation: true,
            //templateUrl: 'semivessel_managerModal.html',
            templateUrl: 'new_vesselModal.html',
            controller: 'SemiIndustrialCtrl',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.vesselSelect = function(){
        if($scope.vessel_select){
           $scope.checkList.vessels =angular.copy($scope.semi_vessel);
        }else{
          $scope.checkList.vessels = []; 
        }
      }; 


    $scope.deleteVessel = function(){

        if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a vessel before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.vessels.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };


        $scope.exportVessel = function(){
           $scope.pdfType = 'Vessels';
          if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a vessel before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          //$scope.deleteText ='Do you want to export '+ $scope.checkList.companies.length +' items';
          $scope.exportdata = $scope.checkList.vessels; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 



      //license things

      $scope.new_semi_license = function(d){
        $scope.license = {};
        $scope.license.Vessel_id = d.Vessel_id; 
        $scope.licensetext = 'New Vessel License';
        $scope.license_button = 'Save';
        $scope.read_license= false;


        $scope.licenseModal = $uibModal.open({
            animation: true, 
            templateUrl:'addlicenseModal.html', 
            controller:'SemiIndustrialCtrl', 
            size:'md', 
            scope:$scope
        })

      }; 

      $scope.closeLicense = function(){
        $scope.licenseModal.dismiss('cancel');
      }


      $scope.edit_semi_license = function(d){
      $scope.license = d;
      $scope.licensetext = d.License_id;
      $scope.license_button = 'Update';   
      $scope.read_license = false; 
      $scope.licenseModal = $uibModal.open({
            animation: true,
            templateUrl: 'addlicenseModal.html',
            controller: 'SemiIndustrialCtrl',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_semi_license = function(d){
      $scope.license = d;
      $scope.licensetext = d.License_id;
      //$scope.license_button = 'Update';   
      $scope.read_license = true; 
      $scope.licenseModal = $uibModal.open({
            animation: true,
            templateUrl: 'addlicenseModal.html',
            controller: 'SemiIndustrialCtrl',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.licenseSelect = function(){
        if($scope.license_select){
           $scope.checkList.licenses = angular.copy($scope.semi_license)
        }else{
          $scope.checkList.licenses = []; 
        }
      }; 


    $scope.deleteLicense = function(){
          if($scope.checkList.licenses.length<1){
              $scope.alertText = 'Select a license before you can delete'; 
              $scope.modalAlert = $uibModal.open({
                    animation: true,
                    templateUrl: 'alertModal.html',
                    controller: 'SemiIndustrialCtrl',
                    size: 'sm',
                    scope: $scope
                  });

          }
          else{
            $scope.deleteText ='Do you want to delete '+ $scope.checkList.licenses.length +' items';
            $scope.modalDelete = $uibModal.open({
                    animation: true,
                    templateUrl: 'deleteModal.html',
                    controller: 'SemiIndustrialCtrl',
                    size: 'sm',
                    scope: $scope
                  });     
          }
        };

        //semi-industrial license

        $scope.exportLicense = function(){
          $scope.pdfType = 'License'; 
          if($scope.checkList.licenses.length<1){
            $scope.alertText = 'Select a license before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.exportdata = $scope.checkList.licenses; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
      }; 

      // tracking things


        $scope.new_semi_tracking = function(){
        $scope.tracking = {};
        $scope.trackingtext = 'New Vessel Tracking';
        $scope.tracking_button = 'Save';
        $scope.read_tracking= false;


        $scope.trackingModal = $uibModal.open({
            animation: true, 
            templateUrl:'trackingModal.html', 
            controller:'SemiIndustrialCtrl', 
            size:'md', 
            scope:$scope
        })

      }; 

      $scope.closeTracking = function(){
        $scope.trackingModal.dismiss('cancel');
      }


      $scope.edit_semi_tracking = function(d){
      $scope.tracking = d;
      $scope.trackingtext = d.Tracking_id;
      $scope.tracking_button = 'Update';   
      $scope.read_tracking = false; 
      $scope.trackingModal = $uibModal.open({
            animation: true,
            templateUrl: 'trackingModal.html',
            controller: 'SemiIndustrialCtrl',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_semi_tracking = function(d){
      $scope.tracking = d;
      $scope.trackingtext = d.Tracking_id;
      //$scope.license_button = 'Update';   
      $scope.read_tracking = true; 
      $scope.trackingModal = $uibModal.open({
            animation: true,
            templateUrl: 'trackingModal.html',
            controller: 'SemiIndustrialCtrl',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.trackingSelect = function(){
        if($scope.tracking_select){
           $scope.checkList.tracking = angular.copy($scope.semi_tracking);//$scope.semi_tracking.map(function(item) { return item.Tracking_id; });
        }else{
          $scope.checkList.tracking = []; 
        }
      }; 


    $scope.deleteTracking = function(){
        if($scope.checkList.tracking.length<1){
            $scope.alertText = 'Select a tracking before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.tracking.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };


        $scope.exportTracking = function(){
          if($scope.checkList.tracking.length<1){
            $scope.alertText = 'Select a tracking before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          //$scope.deleteText ='Do you want to export '+ $scope.checkList.companies.length +' items';
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'SemiIndustrialCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 





      $scope.export = function(){
        $scope.closeExport(); 
      }

      $scope.closeExport = function(){
          $scope.modalExport.dismiss('cancel');
      };

      $scope.closeAlert = function(){
          $scope.modalAlert.dismiss('cancel');
      };
       $scope.closeDelete = function(){
        $scope.modalDelete.dismiss('cancel');
      };

      $scope.delete = function(){
        $scope.closeDelete();
      }

      $scope.nodelete = function(){
        $scope.closeDelete();
      }









    
      //newLicense




    
    $scope.select = 1;

    $scope.setSelected = function (tabId) {
        this.select = tabId;
      };

      $scope.isSelected = function (tabId) {
        return this.select === tabId;
      };

      $scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {

          this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
          return this.tab === tabId;
      };

      $scope.startSpin = function() {
        if (!$scope.spinneractive) {
          usSpinnerService.spin('spinner-1');
          console.log('ghana');
        }
      };

    $scope.stopSpin = function() {
      if ($scope.spinneractive) {
        usSpinnerService.stop('spinner-1');
      }
    };

    //semi-industrial init
      $scope.init = function(){
        
          $http.get(REMOTE+'semi_manager/')
            .then(function(response) {
                $scope.semi_manager = response.data;
                $scope.totalManager = response.data.length;
            });
            $http.get(REMOTE+'semi_vessel/')
            .then(function(response){
                $scope.semi_vessel = response.data;
                 $scope.totalVessel = response.data.length;
            })

          $http.get(REMOTE+'semi_license/')
            .then(function(response){
                $scope.semi_license = response.data;
                 $scope.totalLicense = response.data.length;
            })
          $http.get(REMOTE+'semi_tracking/')
            .then(function(response){
                $scope.semi_tracking = response.data;
                 $scope.totalTracking = response.data.length;
            })

            $http.get(REMOTE+'region/')
            .then(function(response){
                $scope.regionList = response.data;
                // $scope.totalTracking = response.data.length;
            })
            $http.get(REMOTE+'landing_site/')
            .then(function(response){
                $scope.landingList = response.data;
                // $scope.totalTracking = response.data.length;
            })
            $http.get(REMOTE+'vessel_type/')
            .then(function(response){
                $scope.vesselTypeList = response.data       
            })
            $http.get(REMOTE+'semi_vessel_all/')
            .then(function(response){
                $scope.semi_vessel_all = response.data;
            }); 
             $http.get(REMOTE+'replacement')
            .then(function(response){
                $scope.replacementHistory = response.data;
            })
            $http.get(REMOTE+'reason')
            .then(function(response){
              $scope.reasonList = response.data;
            })
            $http.get(REMOTE+'equipmentlisting')
            .then(function(response){
              $scope.equipmentList = response.data; 
            })

            $http.get(REMOTE+'agreement/')
            .then(function(response) {
                $scope.agreementList = response.data;

            });  //zoneList

            $http.get(REMOTE+'fishing_zone/')
            .then(function(response) {
                $scope.fishingzoneList = response.data;
            });
             $http.get(REMOTE+'mesh_size/')
            .then(function(response){
                $scope.meshsizeList = response.data;
            })
             $http.get(REMOTE+'license_officer')
            .then(function(response){
                $scope.licenseOfficerList = response.data;
            }) 

             $http.get(REMOTE+'target_species/')
            .then(function(response) {
                $scope.targetList = response.data;
                
            }); 


          //$scope.stopSpin();
      }

       




})
// Marine Controller

.controller('MarineCtrl', function($scope, $rootScope, $http, REMOTE, $uibModal){
  $rootScope.headingData = 'Marine Canoes';
  $scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };

      $scope.select = 1; 
      $scope.setSelected = function (tabId) {
        this.select = tabId;
      };

      $scope.isSelected = function (tabId) {
        return this.select === tabId;
      };


      $scope.currentPage = 1;
      $scope.pageSize = 10;

      $scope.checkList = {
          managers :[], 
          canoes:[], 
          licenses:[], 
          tracking:[]
      };

       $scope.viewby = 10;
          $scope.itemsPerpageVessel = 10;
          $scope.maxSize = 5; //Number of pager buttons to show


          $scope.currentPage = 1;
          $scope.currentManager = 1; 
          $scope.currentCanoe = 1; 
          

          $scope.currentVessel = 1; 
          $scope.currentLicense = 1; 
          $scope.currentTracking = 1; 
          $scope.numPerPage = 20;
          $scope.maxSize = 5;


          $scope.managernumPerPage = 50;
          $scope.canoenumPerPage = 50;


      //new manager

      //marine page change

      $scope.managerPageChange = function(){
          var t = {
            start:0,
            end: $scope.managernumPerPage
          }
          $http.post(REMOTE+'canoe_manager_read/', t )
            .then(function(response) {
                $rootScope.canoe_manager = response.data;
            });
      }

      $scope.canoePageChange = function(){
          var a = {
              start:0, 
              end: $scope.canoenumPerPage
            }

          $http.post(REMOTE+'canoe_vessel_read/', a)
            .then(function(response){
                $scope.canoe_vessel = response.data
            })
      }



        // Marine showVessel()
       $scope.showVessel = function(n){
          
          $scope.statusHeader = n.Name_Manager;
          $scope.company = n.Company_id;
          //$scope.selectedVessels = []; 
          $scope.replaceList = [];
          $scope.allVessels = [];

          $http.post(REMOTE+'canoe_vessel/'+n.Manager_id).then(function(response){
           // console.log(response.data);
            $scope.selectedVessels = response.data;
          })

            $scope.closestatus = function(){
              $scope.statusModalInstance.dismiss('cancel');
            }


          //console.log($scope.selectedVessels)
              $scope.statusModalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'numberofVessel.html',
                  controller: 'IndustCtrl',
                  size: 'md',
                  scope: $scope
                });
        }

        //Marine printer


    function buildTableBody(data, columns) {
        var body = [];
        body.push( $scope.pdfHeading);

        data.forEach(function(row) {
            var dataRow = [];

            columns.forEach(function(column) {
                dataRow.push(row[column].toString());
            })

            body.push(dataRow);
        });

        return body;
    }

    function table(data, columns) {
        return {
            table: {
                headerRows: 1,
                body: buildTableBody(data, columns)
            }
        };
    }

      $scope.PDFprinter = function(){

      if($scope.pdfType=='Manager'){
       var master =  ['Manager_id', 'Name_Manager', 'Nationality', 'Phone_number', 'totalFinal'];
      $scope.pdfHeading = ["Manager ID", "Manager Name", "Nationality", "Phone No", "Canoes"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Manager_id==null)
              {
                  value.Manager_id='-'; 
              }
              if(value.Name_Manager==null){
                  value.Name_Manager='-';
              }
              if(value.Nationality==null){
                value.Nationality ='-';
              }
              if(value.Phone_number==null){
                value.Phone_number = '-';
              }
              if(value.totalFinal==null){
                value.totalFinal= '-';
              }
          });
      }else if($scope.pdfType=='Canoes'){
        var master =  ['Canoe_id', 'Manager_id', 'label', 'Current_canoe_name', 'Date_registration'];
      $scope.pdfHeading = ["Canoes ID", "Manager ID", "Landing Beach", "Canoe Name", "Registration Date"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Canoe_id==null)
              {
                  value.Canoe_id='-'; 
              }
              if(value.Manager_id==null){
                  value.Manager_id='-';
              }
              if(value.label==null){
                value.label ='-';
              }
              if(value.Current_canoe_name==null){
                value.Current_canoe_name = '-';
              }
              if(value.Date_registration==null){
                value.Date_registration= '-';
              }else{
                value.Date_registration = value.Date_registration.slice(0, -14);
              }
              
              
          });

      }else if($scope.pdfType =='License'){
        var master =  ['License_id', 'Vessel_id', 'Name', 'Starting_date', 'End_date', 'Date_issue'];
        $scope.pdfHeading = ["License ID", "Vessel ID", "Agreement Type", "Start Date", "End Date", "Issue Date"];
          angular.forEach($scope.exportdata, function(value, key){
              if(value.License_id==null)
              {
                  value.License_id ='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id ='-';
              }
              if(value.Name==null){
                value.Name ='-';
              }
              if(value.Starting_date==null){
                value.Starting_date = '-';
              }else{
                value.Starting_date  = value.Starting_date.slice(0, -14);
              }
              if(value.End_date==null){
                value.End_date= '-';
              }else{
                   value.End_date = value.End_date.slice(0, -14);
              }
              if(value.Date_issue==null){
                value.Date_issue= '-';
              }else{
                  value.Date_issue = value.Date_issue.slice(0, -14)
              }
          });

      }else if($scope.pdfType=='Tracking'){
          var master =  ['Vessel_id', 'V', 'Change_date', 'Change_description'];
        $scope.pdfHeading = ["Vessel ID", "Change Type", "Change Date", "Change Description"];
          angular.forEach($scope.exportdata, function(value, key){
              if(value.Vessel_id==null)
              {
                  value.Vessel_id ='-'; 
              }
              if(value.V==null){
                  value.V ='-';
              }
              if(value.Change_description==null){
                value.Change_description ='-';
              }
              if(value.Change_date==null){
                value.Change_date = '-';
              }else{
                value.Change_date  = value.Change_date.slice(0, -14);
              }
              
          });
      }




          var docDefinition = {
              content: [
                  { text: 'Dynamic parts', style: 'header' },
                  table($scope.exportdata, master)

              ]
          }

           pdfMake.createPdf(docDefinition).download('something.pdf')
     }
     //industrial openFile
     $scope.openFile = function(n){
        window.open(n.file);
     }




      $scope.new_canoe_manager = function(){

      $scope.manager = {};
      $scope.managertext = 'New Marine Canoe Manager';
      $scope.manager_button = 'Save';   
      $scope.read_manager = false;    
      $scope.canoeModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'canoe_manager.html',
            controller: 'MarineCtrl',
            size: 'md',
            scope: $scope
      });
    };

    $scope.close_canoe_manager = function(){
      $scope.canoeModalInstance.dismiss('cancel');   
    }

    $scope.edit_canoe_manager = function(d){
      $scope.manager = d;
      $scope.managertext = d.Manager_id;
      $scope.manager_button = 'Update';   
      $scope.read_manager = false; 
      $scope.canoeModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'canoe_manager.html',
            controller: 'MarineCtrl',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_canoe_manager = function(d){
      $scope.manager = d;
      $scope.managertext = d.Manager_id;
      //$scope.manager_button = 'Update';   
      $scope.read_manager = true; 
      $scope.canoeModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'canoe_manager.html',
            controller: 'MarineCtrl',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.managerSelectClick = function(){
      //alert('ghana');
        if($scope.manager_select){
           $scope.checkList.managers = angular.copy($scope.canoe_manager);//(function(item) { return item.Manager_id; });
        }else{
          $scope.checkList.managers = []; 
        }
      }; 


    $scope.deleteManager = function(){
        if($scope.checkList.managers.length<1){
            $scope.alertText = 'Select a manager before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.managers.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });     
          }

        };

        $scope.exportManager = function(){
          $scope.pdfType = 'Manager'; 
          if($scope.checkList.managers.length<1){
            $scope.alertText = 'Select a manager before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.exportdata = $scope.checkList.managers; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 




 //new cannoe

    $scope.new_canoe_vessel = function(d){
      //console.log(d);
      $scope.canoe = {};
      $scope.canoetext = 'New Marine Canoe';
      $scope.canoe_button = 'Save'; 
      $scope.canoe.Manager_id  = d.Manager_id; 
      $scope.read_canoe = false;    
      $scope.canoeModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'new_canoe_vesselModal.html',
            controller: 'MarineCtrl',
            size: 'md',
            scope: $scope
      });
    };

    $scope.newcanoeClose = function(){
      $scope.canoeModalInstance.dismiss('cancel');   
    }

    $scope.edit_canoe_vessel = function(d){
      $scope.canoe = d;
      $scope.canoetext = d.Canoe_id;
      $scope.canoe_button = 'Update';   
      $scope.read_canoe = false; 
      $scope.canoeModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'new_canoe_vesselModal.html',
            controller: 'MarineCtrl',
            size: 'md',
            scope: $scope
      });
    }

    $scope.view_canoe_vessel = function(d){
      $scope.canoe = d;
      $scope.canoetext = d.Canoe_id;
      //$scope.manager_button = 'Update';   
      $scope.read_canoe = true; 
      $scope.canoeModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'new_canoe_vesselModal.html',
            controller: 'MarineCtrl',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.canoeSelectClick = function(){
        if($scope.canoe_select){
           $scope.checkList.canoes = angular.copy($scope.canoe_vessel); //.map(function(item) { return item.Canoe_id; });
        }else{
          $scope.checkList.canoes = []; 
        }
      }; 


    $scope.deleteCanoe = function(){
        if($scope.checkList.canoes.length<1){
            $scope.alertText = 'Select a canoe before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.canoes.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });     
          }

        };

        $scope.exportCanoe = function(){
          $scope.pdfType = 'Canoes'; 
          if($scope.checkList.canoes.length<1){
            $scope.alertText = 'Select a canoe before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.exportdata = $scope.checkList.canoes; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 






      $scope.export = function(){
        $scope.closeExport(); 
      }

      $scope.closeExport = function(){
          $scope.modalExport.dismiss('cancel');
      };

      $scope.closeAlert = function(){
          $scope.modalAlert.dismiss('cancel');
      };
       $scope.closeDelete = function(){
        $scope.modalDelete.dismiss('cancel');
      };

      $scope.delete = function(){
        $scope.closeDelete();
      }

      $scope.nodelete = function(){
        $scope.closeDelete();
      }


      //Date functions
      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };

      

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

      //marine init

    $scope.init = function(){
          $http.get(REMOTE+'dash_canoes_manager/')
            .then(function(response) {
                $scope.canoesManagerTotal = response.data[0].total;
            });

            $http.get(REMOTE+'dash_canoes_vessel/')
            .then(function(response) {
                $scope.canoesVesselTotal = response.data[0].total;    
            });
          var t = {
            start:0,
            end: $scope.managernumPerPage
          }
          $http.post(REMOTE+'canoe_manager_read/', t )
            .then(function(response) {
                $rootScope.canoe_manager = response.data;
                //$scope.totalCanoeManager= response.data.length; 
            });

            var a = {
              start:0, 
              end: $scope.canoenumPerPage
            }

          $http.post(REMOTE+'canoe_vessel_read/', a)
            .then(function(response){
                $scope.canoe_vessel = response.data
            })

            $http.get(REMOTE+'construction_material/')
            .then(function(response) {
                $scope.constructionList = response.data;
                
            });

             $http.get(REMOTE+'engine/')
            .then(function(response) {
                $scope.mainengineList = response.data;
                
            });

            $http.get(REMOTE+'fishing_gear/')
            .then(function(response) {
                $scope.fishing_gearList = response.data;

            });

            $http.get(REMOTE+'region/')
            .then(function(response) {
                $scope.regionList = response.data;
            });

            $http.get(REMOTE+'district/')
            .then(function(response) {
                $scope.districtList = response.data;
            });

            $http.get(REMOTE+'village/')
            .then(function(response) {
                $scope.villageList = response.data;
            });
            $http.get(REMOTE+'landing_beach/')
            .then(function(response) {
                $scope.beachList = response.data;
            });

             $http.get(REMOTE+'equipmentlisting/')
            .then(function(response) {
                $scope.equipmentList = response.data;
                //console.log($scope.eq)
            }); 
            
      }

      $scope.managerSelect = function(){
            var t ={
                start: parseInt($scope.managernumPerPage) *(parseInt($scope.currentVessel) - 1), 
                 end: $scope.managernumPerPage
            } 
            $http.post(REMOTE+'canoe_manager_read/', t )
            .then(function(response) {
              //$scope.canoe_manager  = {};
                $scope.canoe_manager = response.data;
            });
      }

      $scope.canoeSelect = function(){
            var th ={
                start: parseInt($scope.canoenumPerPage) *(parseInt($scope.currentCanoe) - 1), 
                 end: $scope.canoenumPerPage
            }
            
            $http.post(REMOTE+'canoe_vessel_read/', th )
            .then(function(response) {
              //$scope.canoe_manager  = {};
                $scope.canoe_vessel = response.data;
            });
      }


})
.controller('McsCtrl', function($scope, $rootScope, $http, REMOTE, $uibModal){
$rootScope.headingData = 'MCS Activity';
      $scope.tab = 1; 
      $scope.maxSize = 5;
      $scope.currentVessel = 1; 
      var that = this; 

      $scope.checkList = {
          vessels :[], 
          canoes:[]
      };
      $scope.itemsPerpageVessel = 20;
      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };

      $scope.init = function(){
          $http.get(REMOTE+'mcs_compliance/')
            .then(function(response) {
                $scope.mcs_compliance = response.data;
                $scope.mcs_vesselTotal = response.data.length; 
            });
            
    }; 

     function buildTableBody(data, columns) {
          var body = [];
          body.push( $scope.pdfHeading);

          data.forEach(function(row) {
              var dataRow = [];

              columns.forEach(function(column) {
                  dataRow.push(row[column].toString());
              })

              body.push(dataRow);
          });

          return body;
      }

      function table(data, columns) {
          return {
              table: {
                  headerRows: 1,
                  body: buildTableBody(data, columns)
              }
          };
      }

    $scope.PDFprinter = function(){
     
      if($scope.pdfType=='Manager'){
       var master =  ['Manager_id', 'Name_Manager', 'Phone_number', 'finalTotal'];
      $scope.pdfHeading = ["Manager ID", "Name of Manager", "Phone Number", "Vessels"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Manager_id==null)
              {
                  value.Manager_id='-'; 
              }
              if(value.Name_Manager==null){
                  value.Name_Manager='-';
              }
              if(value.Phone_number==null){
                value.Phone_number ='-';
              }
              if(value.finalTotal==null){
                value.finalTotal = '-';
              }
              
          });
      }else if($scope.pdfType=='Vessel'){
        var master =  ['Inspection_id', 'Vessel_id', 'Type_vessel', 'Name', 'Date_inspection', 'Time_inspection', 'Inspection_results'];
      $scope.pdfHeading = ["Inspection ID", "Vessel ID", "Vessel Type", "Inspection Authority", "Inspection Date", "Inspection Time", "Results"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Inspection_id==null)
              {
                  value.Inspection_id='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id ='-';
              }
              if(value.Type_vessel==null){
                value.Type_vessel ='-';
              }
              if(value.Name==null){
                value.Name = '-';
              }
              if(value.Date_inspection==null){
                value.Date_inspection = '-';
              }else{
                value.Date_inspection = value.Date_inspection.slice(0, -14);
              }

              if(value.Time_inspection==null){
                value.Time_inspection = '-';
              }
              if(value.Inspection_results==null){
                value.Inspection_results= '-';
              }
              //value.Date_registration = value.Date_registration.slice(0, -14);
          });

      }else if($scope.pdfType =='License'){
        var master =  ['License_id', 'Vessel_id', 'Name', 'Starting_date', 'End_date', 'Date_issue'];
        $scope.pdfHeading = ["License ID", "Vessel ID", "Agreement Type", "Start Date", "End Date", "Issue Date"];
          //console.log($scope.exportdata)
          angular.forEach($scope.exportdata, function(value, key){
              if(value.License_id==null)
              {
                  value.License_id ='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id ='-';
              }
              if(value.Name==null){
                value.Name ='-';
              }
              if(value.Starting_date==null){
                value.Starting_date = '-';
              }else{
                value.Starting_date  = value.Starting_date.slice(0, -14);
              }
              if(value.End_date==null){
                value.End_date= '-';
              }else{
                   value.End_date = value.End_date.slice(0, -14);
              }
              if(value.Date_issue==null){
                value.Date_issue= '-';
              }else{
                  value.Date_issue = value.Date_issue.slice(0, -14)
              }
          });

      }else if($scope.pdfType=='Tracking'){
          var master =  ['Vessel_id', 'V', 'Change_type', 'Change_date', 'Change_description'];
        $scope.pdfHeading = ["Vessel ID", "Change Type", "Change Date", "Change Description"];
          angular.forEach($scope.exportdata, function(value, key){
              if(value.Vessel_id==null)
              {
                  value.Vessel_id ='-'; 
              }
              if(value.Change_type==null){
                  value.Change_type ='-';
              }
              if(value.Change_description==null){
                value.Change_description ='-';
              }
              if(value.Change_date==null){
                value.Change_date = '-';
              }else{
                value.Change_date  = value.Change_date.slice(0, -14);
              }
              
          });
      }




        var docDefinition = {
              content: [
                  { text: 'Dynamic parts', style: 'header' },
                  table($scope.exportdata, master)
              ]
          }
           pdfMake.createPdf(docDefinition).download('something.pdf')
        }
 











      $scope.new_vessel_compliance = function(){

      $scope.vesselcompliance = {};
      $scope.vesselcompliancetext = 'New Vessel Compliance Report';
      $scope.vesselcompliance_button = 'Save';   
      $scope.read_vessel = false;    
      $scope.complianceModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'vesselComplianceModal.html',
            controller: 'McsCtrl',
            size: 'md',
            scope: $scope
      });
    };

    $scope.newcomplianceClose = function(){
      $scope.complianceModalInstance.dismiss('cancel');   
    }

    $scope.edit_compliance_vessel = function(d){

      $scope.vesselcompliance = d;
      $scope.vesselcompliancetext = d.Inspection_id;
      $scope.vesselcompliance_button = 'Update';   
      $scope.read_vessel = false; 
      $scope.complianceModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'vesselComplianceModal.html',
            controller: 'McsCtrl',
            size: 'md',
            scope: $scope
      });
    }

    $scope.view_compliance_vessel = function(d){
      $scope.vesselcompliance = d;
      $scope.vesselcompliancetext = d.Inspection_id;  
      $scope.read_vessel = true; 
      $scope.complianceModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'vesselComplianceModal.html',
            controller: 'McsCtrl',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.compliancevesselSelect = function(){
        if($scope.compliancevessel_select){
           $scope.checkList.vessels = angular.copy($scope.mcs_compliance); //.map(function(item) { return item.Inspection_id; });
        }else{
          $scope.checkList.vessels = []; 
        }
      }; 


    $scope.deleteComplianceVessel = function(){
        if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a report item before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.vessels.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'MarineCtrl',
                  size: 'sm',
                  scope: $scope
                });     
          }

        };

        $scope.exportComplianceVessel = function(){
          $scope.pdfType = 'Vessel'; 
          if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a report item before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'McsCtrl',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.exportdata = $scope.checkList.vessels; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'McsCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 

      $scope.export = function(){
        $scope.closeExport(); 
      }

      $scope.closeExport = function(){
          $scope.modalExport.dismiss('cancel');
      };

      $scope.closeAlert = function(){
          $scope.modalAlert.dismiss('cancel');
      };
       $scope.closeDelete = function(){
        $scope.modalDelete.dismiss('cancel');
      };

      $scope.delete = function(){
        $scope.closeDelete();
      }

      $scope.nodelete = function(){
        $scope.closeDelete();
      }


})
.controller('DataReportingCtrl', function($scope, $rootScope, $http, REMOTE, $uibModal){
  $rootScope.headingData = 'Data Reporting';

  $scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };



    $scope.init = function(){
       $http.get(REMOTE+'active_industrial/')
            .then(function(response) {
                $scope.industrialList = response.data;
                //console.log($scope.industrialList);
                
            });
    $http.get(REMOTE+'active_semi_industrial/')
            .then(function(response) {
                $scope.semiList = response.data;
                //console.log($scope.semiList)
            }); 
    }; 

    $scope.operations = [{name:'Contains', item:''}, {name:'Equals', item:''},{name:'Starts With', item:''},{name:'More than', item:''},{name:'Less than', item:''},{name:'Between', item:''},{name:'Empty', item:''},{name:'Doesnt contain', item:''},{name:'Doesnt equal', item:''},{name:'Is not more than', item:''},{name:'Is not less than', item:''},{name:'Is not between', item:''}, {name:'Is not empty', item:''}];

    $scope.query =function(n){
          //$scope.exportdata = $scope.industrialList
          //$scope.pdfType = 'Industrial';
          var t = {
              name: n
          }
          $http.post(REMOTE+'columnSearch',t ).then(function(response){
              $scope.selectedListing = response.data; 
          })


          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'queryModal.html',
                  controller: 'DataReportingCtrl',
                  size: 'md',
                  scope: $scope
                });  
    }
    $scope.searching = {};

    $scope.queryList = [];
    $scope.queryAdd = function()
    {
        $scope.queryList.push($scope.searching); 
        console.log($scope.queryList)
        $scope.searching = {};
    }


     $scope.exportActiveVessel = function(){ 
          $scope.exportdata = $scope.industrialList
          $scope.pdfType = 'Industrial';
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'DataReportingCtrl',
                  size: 'sm',
                  scope: $scope
                });         
        }; 
    $scope.exportActiveSemiVessel = function(){ 
          $scope.exportdata = $scope.semiList;
          $scope.pdfType = 'Semi-Industrial';
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'DataReportingCtrl',
                  size: 'sm',
                  scope: $scope
                });         
        }; 

        $scope.closeExport = function(){
            $scope.modalExport.dismiss('cancel');
        }

        function buildTableBody(data, columns) {
    var body = [];
    body.push( $scope.pdfHeading);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
}

function table(data, columns) {
    return {
        table: {
            headerRows: 1,
            body: buildTableBody(data, columns)
        }
    };
}

        $scope.PDFprinter = function(){
          console.log($scope.pdfType);
      if($scope.pdfType=='Industrial'){
       var master =  ['License_id', 'Vessel_id', 'Starting_date', 'End_date'];
      $scope.pdfHeading = ["License ID", "Vessel ID", "Start Date", "Expiry Date"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.License_id==null)
              {
                  value.License_id='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id='-';
              }
              if(value.Starting_date==null){
                value.Starting_date ='-';
              }else{
                 value.Starting_date = value.Starting_date.slice(0, -14);
              }
              if(value.End_date==null){
                value.End_date = '-';
              }else{
                 value.End_date = value.End_date.slice(0, -14);
              }
              
          });
      }else if($scope.pdfType=='Semi-Industrial'){
       var master =  ['License_id', 'Vessel_id', 'Starting_date', 'End_date'];
      $scope.pdfHeading = ["License ID", "Vessel ID", "Start Date", "Expiry Date"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.License_id==null)
              {
                  value.License_id='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id='-';
              }
              if(value.Starting_date==null){
                value.Starting_date ='-';
              }
              else{
                 value.Starting_date = value.Starting_date.slice(0, -14);
              }
              if(value.End_date==null){
                value.End_date = '-';
              }else{
                 value.End_date = value.End_date.slice(0, -14);
              }
              
          });

      }
      var docDefinition = {
              content: [
                  { text: 'Active '+ $scope.pdfType + ' Report', style: 'header' },
                  table($scope.exportdata, master)

              ]
          }

           pdfMake.createPdf(docDefinition).download('activeReports.pdf')


    }

/*

          var docDefinition = {
              content: [
                  { text: 'Dynamic parts', style: 'header' },
                  table($scope.exportdata, master)

              ]
          }

           pdfMake.createPdf(docDefinition).download('something.pdf')
     }
     //industrial openFile
     $scope.openFile = function(n){
        window.open(n.file);
     }
*/


})
.controller('AuxiliaryCtrl', function($scope, $rootScope, $http, REMOTE, $uibModal){
$rootScope.headingData = 'Auxiliary Data';
$scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };


    $scope.editModal = function(d){
     
      $scope.temp = d;
      $scope.temp_read = false; 
      $scope.firstLabel = 'Code'; 
      $scope.secondLabel = 'Name'; 
      //$scope.number = d; 
      $scope.headerText = 'Edit '+d.name; 
      //$scope.vesselcompliance = d;
      //$scope.vesselcompliancetext = d.Inspection_id;  
      //$scope.read_vessel = true; 

      if(d==1){
       
      }


      $scope.tempModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'alertModal.html',
            controller: 'AuxiliaryCtrl',
            size: 'md',
            scope: $scope
      });
    
    };

    $scope.showModal = function(d, text){
      $scope.temp = {};
      $scope.temp_read = false; 
      $scope.firstLabel = 'Code'; 
      $scope.secondLabel = 'Name'; 
      $scope.number = d; 
      $scope.headerText = text; 
      //$scope.vesselcompliance = d;
      //$scope.vesselcompliancetext = d.Inspection_id;  
      //$scope.read_vessel = true; 

      if(d==1){
       
      }if(d==20){

      }


      $scope.tempModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'alertModal.html',
            controller: 'AuxiliaryCtrl',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.closeModal = function(){
      $scope.tempModalInstance.dismiss('cancel');
    }

    $scope.saveTemp = function(d){
      console.log(d);
      if(d==20){
          $http.post(REMOTE+'mesh_size', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();
          })
      }else if(d==21){
          $http.post(REMOTE+'crewType', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();
          })
      }else if(d==22){
          $http.post(REMOTE+'license_officer', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();
          })
      }else if(d==23){
          $http.post(REMOTE+'reason', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();

          })
      }
      $scope.init();
      
    }


//auxiliary init
$scope.init = function(){
            $http.get(REMOTE+'authority_inspection/')
            .then(function(response) {
                $scope.authorityList = response.data;
            }); 
            
             $http.get(REMOTE+'construction_material/')
            .then(function(response) {
                $scope.materialsList = response.data;
            }); 


             $http.get(REMOTE+'equipment/')
            .then(function(response) {
                $scope.equipmentList = response.data;
            }); 

            $http.get(REMOTE+'fishing_company/')
            .then(function(response) {
                $scope.companyList = response.data;
            }); 
             $http.get(REMOTE+'target_species/')
            .then(function(response) {
                $scope.targetList = response.data;
            }); 
             $http.get(REMOTE+'agreement/')
            .then(function(response) {
                $scope.agreementList = response.data;
            }); 

            $http.get(REMOTE+'engine/')
            .then(function(response) {
                $scope.engineList = response.data;
            }); 
            $http.get(REMOTE+'fishing_gear/')
            .then(function(response) {
                $scope.fishingList = response.data;
            });

            $http.get(REMOTE+'storage/')
            .then(function(response) {
                $scope.storageList = response.data;
            });
            $http.get(REMOTE+'tracking_type/')
            .then(function(response) {
                $scope.trackingList = response.data;
            });

            $http.get(REMOTE+'vessel_type/')
            .then(function(response) {
                $scope.vesselList = response.data;
            });

            $http.get(REMOTE+'region/')
            .then(function(response) {
                $scope.regionList = response.data;
            });

            $http.get(REMOTE+'district/')
            .then(function(response) {
                $scope.districtList = response.data;
            });

            $http.get(REMOTE+'village/')
            .then(function(response) {
                $scope.villageList = response.data;
            });
            $http.get(REMOTE+'landing_beach/')
            .then(function(response) {
                $scope.beachList = response.data;
            });

            $http.get(REMOTE+'inspection_place/')
            .then(function(response) {
                $scope.inspectionList = response.data;
            });

            $http.get(REMOTE+'landing_site/')
            .then(function(response) {
                $scope.ladingsiteList = response.data;
            });

            $http.get(REMOTE+'fishing_zone/')
            .then(function(response) {
                $scope.fishingzoneList = response.data;
            });
            $http.get(REMOTE+'country_flag/')
            .then(function(response) {
                $scope.flagList = response.data;
            });

             $http.get(REMOTE+'mesh_size/')
            .then(function(response){
                $scope.meshsizeList = response.data;
            })

            $http.get(REMOTE+'crewType')
            .then(function(response){
                $scope.crewTypeList = response.data;
               // console.log($scope.crewTypeList)
            }) //license_officer

               $http.get(REMOTE+'license_officer')
            .then(function(response){
                $scope.licenseOfficerList = response.data;
               // console.log($scope.crewTypeList)
            }) 

            $http.get(REMOTE+'reason')
            .then(function(response){
                $rootScope.reasonList = response.data
            })

    }

})
.controller('RegisterCtrl', function($scope, $rootScope, $http, REMOTE, $uibModal){
$rootScope.headingData = 'Register Audit Log';

          $scope.init = function(){
            $http.get(REMOTE+'audit/')
            .then(function(response) {
                $scope.auditList = response.data;
            }); 
          }

          $scope.checkList = {
            audits:[]
          }

           $scope.auditSelect = function(){
          
        if($scope.audit_select){
           $scope.checkList.audits = $scope.auditList.map(function(item) { return item.id; });
        }else{
          $scope.checkList.audits = []; 
        }
      }; 


    $scope.deleteAudit = function(){
        if($scope.checkList.audits.length<1){
            $scope.alertText = 'Select an audit item before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'RegisterCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.audits.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'RegisterCtrl',
                  size: 'sm',
                  scope: $scope
                });     
          }

        };

        $scope.exportAudit = function(){
          if($scope.checkList.audits.length<1){
            $scope.alertText = 'Select a report item before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'RegisterCtrl',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'RegisterCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 

      $scope.export = function(){
        $scope.closeExport(); 
      }

      $scope.closeExport = function(){
          $scope.modalExport.dismiss('cancel');
      };

      $scope.closeAlert = function(){
          $scope.modalAlert.dismiss('cancel');
      };
       $scope.closeDelete = function(){
        $scope.modalDelete.dismiss('cancel');
      };

      $scope.delete = function(){
        $scope.closeDelete();
      }

      $scope.nodelete = function(){
        $scope.closeDelete();
      }




})
.controller('AdminCtrl', function($scope, $rootScope, $http, REMOTE, $uibModal){
$rootScope.headingData = 'Administrator';

  $scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };


  $scope.init = function(){
        $http.get(REMOTE+'user_groups/')
            .then(function(response) {
                $scope.usergroupList = response.data;
                
            });
        $http.get(REMOTE+'user_rights/')
            .then(function(response) {
                $scope.userrightsList = response.data;
            });

         $http.get(REMOTE+'group_members/')
            .then(function(response) {
                $scope.userList = response.data;
            });

        $http.get(REMOTE+'users/')
            .then(function(response) {
                $scope.loginList = response.data;
            });

  }

  $scope.showGroup = function(){
     $scope.tempModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'groupModal.html',
            controller: 'AdminCtrl',
            size: 'md',
            scope: $scope
      });
  }; 
  //addUser
  $scope.addUser = function(){
    $scope.newuser = {};
    $scope.button = 'Save';
    $scope.userModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addUserModal.html',
            controller: 'AdminCtrl',
            size: 'md',
            scope: $scope
      });

  }

  $scope.editUser = function(d){
    $scope.newuser = d; 
    $scope.button = 'Update';
      $scope.userModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addUserModal.html',
            controller: 'AdminCtrl',
            size: 'md',
            scope: $scope
      });
  }

  $scope.closeUser =function(){
    $scope.userModalInstance.dismiss('cancel');
  }

  $scope.list = 
 [{name:'Authority Inspection', id:'authority_inspection', status:''}, {name:'Canoes', id:'canoes' , status:''}, {name:'Canoes Report', id:'canoes Report', status:''}, {name:'Canoes Compliance', id:'canoes_compliance', status:''}, 
  {name:'Canoes Compliance Report', id:'canoes_compliance Report', status:''},{name:'Canoes Licenses', id:'canoes_licenses', status:''},{name:'Canoes License Report', id:'canoes_licenses Report', status:''},{name:'Canoes Managers', id:'canoes_managers', status:''},
  {name:'Canoes Managers Report', id:'canoes_managers Report', status:''},{name:'Coastal District', id:'coastal_district', status:''},{name:'Coastal Region', id:'coastal_region', status:''},{name:'Construction Material', id:'construction_material', status:''},
  {name:'Country Flag', id:'country_flag', status:''},{name:'Equipment', id:'equipment', status:''},{name:'Fishing Company', id:'fishing_company', status:''},{name:'Fishing Village', id:'fishing_village', status:''},
  {name:'Fishing Zones', id:'fishing_zones', status:''},{name:'Industrial Vessel', id:'industrial_vessel', status:''},{name:'Industrial Vessel Report', id:'industrial_vessel Report', status:''},{name:'Industrial Vessel License', id:'industrial_vessel_license', status:''},
  {name:'Industrial Vessel License Report', id:'industrial_vessel_license Report', status:''},{name:'Industrial Vessel Tracking', id:'industrial_vessel_tracking', status:''},{name:'Landing Beach', id:'landing_beach', status:''},{name:'Landing Site', id:'landing_site', status:''},
  {name:'Marine Canoe Tracking', id:'marine_canoe_tracking', status:''},{name:'Place of Inspection', id:'place_of_inspection', status:''},{name:'Register Audit', id:'register_audit', status:''},{name:'Semi Industrial Vessel', id:'semi_industrial_vessel', status:''},
  {name:'Semi Industrial License Report', id:'semi_industrial_vessel Report', status:''},{name:'Semi Industrial Vessel License', id:'semi_industrial_vessel_license', status:''},{name:'Semi Industrial Vessel License Report', id:'semi_industrial_vessel_license Report', status:''},{name:'Semi Industrial Vessel Tracking', id:'semi_industrial_vessel_tracking', status:''},
  {name:'Target Species', id:'target_species', status:''},{name:'Type of Agreement', id:'type_of_agreement', status:''},{name:'Type of Engine', id:'type_of_engine', status:''},{name:'Type of Fishing Gear', id:'type_of_fishing_gear', status:''},
  {name:'Type of Storage', id:'type_of_storage', status:''},{name:'Type of Tracking Change', id:'type_of_tracking_change', status:''},{name:'Type of Vessel', id:'type_of_vessel', status:''},{name:'Vessels Compliance Report', id:'vessels_compliance_report Report', status:''},
  {name:'Vessel Company', id:'vessel_company', status:''},{name:'Vessel Company Report', id:'vessel_company Report', status:''},{name:'Vessel Manager', id:'vessel_manager', status:''},{name:'Vessel Manager Report', id:'vessel_manager Report', status:''},
  ];

 
  $scope.closegroupModal = function(){
    $scope.tempModalInstance.dismiss('cancel');
  }

  $scope.permitCheck = function(a, b){
     return a===b;
  }


 // $scope.add
  $scope.checkList = {
      add:true
  }

  $scope.addCheck = function(d){
      if(d.indexOf('A') > -1){
        return true;
      }
  }
  $scope.editCheck = function(d){
      if(d.indexOf('E') >-1){
        return true; 
      }
  }
  $scope.deleteCheck = function(d){
      if(d.indexOf('D') >-1){
        return true; 
      }
  }

  $scope.listCheck = function(d){
      if(d.indexOf('S') >-1){
        return true; 
      }
  }
  $scope.printCheck = function(d){
       if(d.indexOf('P') >-1){
        return true; 
      }
  }
  $scope.importCheck = function(d){

     if(d.indexOf('M') >-1){
        return true; 
      }
  }
  $scope.adminCheck = function(d){
    
  }

  $scope.groupRight = function(d){
    $scope.userrightsListSelected = [];
    angular.forEach($scope.userrightsList, function(value, key) {
        if(value.GroupID===d){
          //console.log(value);
            angular.forEach($scope.list, function(first, keys){
              //console.log(value.TableName)
                if(value.TableName===first.id){
                    first.status = value.AccessMask;
                }
            })
            //$scope.userrightsListSelected.push(value)
        }
    });

    //console.log($scope.list)

  }
}).controller('ActiveCtrl', function($scope, $rootScope, $http, REMOTE, $uibModal){

   $http.get(REMOTE+'active_industrial/')
            .then(function(response) {
                $scope.industrialList = response.data;
                console.log($scope.industrialList);
                
            });
    $http.get(REMOTE+'active_semi_industrial/')
            .then(function(response) {
                $scope.semiList = response.data;
            }); 

})
.directive('rdLoading', function() {
   var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
  })
.directive('rdWidgetBody', function(){

	   var directive = {
        requires: '^rdWidget',
        scope: {
            loading: '@?',
            classes: '@?'
        },
        transclude: true,
        template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;
}).directive('rdWidgetFooter', function(){

	 var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
    };
    return directive;
}).directive('rdWidgetHeader', function(){
	    var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@'
        },
        transclude: true,
        template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
        restrict: 'E'
    };
    return directive;
}).directive('rdWidget', function(){
	    var directive = {
        transclude: true,
        template: '<div class="widget" ng-transclude></div>',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        /* */
    }
}).filter('imgThumb', function() {
        return function(images, start) {
              if(images){
                  return images.slice(start);
              }
            
        };
})

.directive('exportTable', function(){
     /* var directive = {
        transclude: true,
        template: '<div class="widget" ng-transclude></div>',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        
    }*/


var link = function($scope, elm, attr){
$scope.$on('export-pdf', function(e, d){
      elm.tableExport({type:'pdf', escape:'false'});
 });
$scope.$on('export-excel', function(e, d){
       elm.tableExport({type:'excel', escape:false});
 });
$scope.$on('export-doc', function(e, d){
     elm.tableExport({type: 'doc', escape:false});
 });




    return{
      restrict:'C', 
      link:link
    }
  }
})


.controller('IndustCtrl', function($scope, $rootScope, $uibModal, $http, REMOTE, Upload){
    $rootScope.headingData = 'Industrial Vessels';
    $scope.loadAmount = 0; 
    $scope.loadAmountEvidence = 0; 
    $scope.loadAmountStatus = 0;
    //$scope.example1data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];

     $http.get(REMOTE+'equipmentlisting/')
            .then(function(response) {
                $scope.equipmentList = response.data;
                
            }); 

    $scope.example14model = [];
    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };
    $scope.example14data =$scope.equipmentList;
 


  $scope.upload = function (file) {
      //console.log(file);
        Upload.upload({
            url: REMOTE+'photo',
            data: {file: file, 'username':'userPhoto' }
        }).then(function (resp) {
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $scope.newvessel.Photo_vessel = REMOTE+'uploads/'+resp.data;

        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.loadAmount = progressPercentage;
        });
    };


  $scope.uploadEvidence = function (file) {
        Upload.upload({
            url: REMOTE+'evidencefile',
            data: {file: file, 'username':'userFile' }
        }).then(function (resp) {
            $scope.replacement.evidence = REMOTE+'uploads/Env'+resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.loadAmountEvidence = progressPercentage;
        });
  };


   $scope.uploadStatus = function (file) {
        Upload.upload({
            url: REMOTE+'statusfile',
            data: {file: file, 'username':'userStatus' }
        }).then(function (resp) {
            $scope.statusChange.photo = REMOTE+'uploads/'+resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.loadAmountStatus = progressPercentage;
        });
  };


    $scope.exportSelected = {};

    //pdf printer


function buildTableBody(data, columns) {
    var body = [];
    body.push( $scope.pdfHeading);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
}

function table(data, columns) {
    return {
        table: {
            headerRows: 1,
            body: buildTableBody(data, columns)
        }
    };
}

    $scope.PDFprinter = function(){

      if($scope.pdfType=='Company'){
       var master =  ['Company_id', 'Company_name', 'Year_establishment', 'Name_director', 'finalTotal'];
      $scope.pdfHeading = ["Company ID", "Company Name", "Year of Establishment", "Name of Director", "Vessels"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Company_id==null)
              {
                  value.Company_id='-'; 
              }
              if(value.Company_name==null){
                  value.Company_name='-';
              }
              if(value.Year_establishment==null){
                value.Year_establishment ='-';
              }
              if(value.Name_director==null){
                value.Name_director = '-';
              }
              if(value.finalTotal==null){
                value.finalTotal= '-';
              }
          });
      }else if($scope.pdfType=='Vessels'){
        var master =  ['Vessel_id', 'Company_id', 'Current_vessel_name', 'Name', 'Date_registration', 'count'];
      $scope.pdfHeading = ["Vessel ID", "Company ID", "Current Vessel Name", "Flag Origin", "Registration Date", "Licenses"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Vessel_id==null)
              {
                  value.Vessel_id='-'; 
              }
              if(value.Company_id==null){
                  value.Company_id='-';
              }
              if(value.Current_vessel_name==null){
                value.Current_vessel_name ='-';
              }
              if(value.Name==null){
                value.Name = '-';
              }
              if(value.Date_registration==null){
                value.Date_registration= '-';
              }
              if(value.count==null){
                value.count= '-';
              }
              value.Date_registration = value.Date_registration.slice(0, -14);
          });

      }else if($scope.pdfType =='License'){
        var master =  ['License_id', 'Vessel_id', 'Name', 'Starting_date', 'End_date', 'Date_issue'];
        $scope.pdfHeading = ["License ID", "Vessel ID", "Agreement Type", "Start Date", "End Date", "Issue Date"];
          angular.forEach($scope.exportdata, function(value, key){
              if(value.License_id==null)
              {
                  value.License_id ='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id ='-';
              }
              if(value.Name==null){
                value.Name ='-';
              }
              if(value.Starting_date==null){
                value.Starting_date = '-';
              }else{
                value.Starting_date  = value.Starting_date.slice(0, -14);
              }
              if(value.End_date==null){
                value.End_date= '-';
              }else{
                   value.End_date = value.End_date.slice(0, -14);
              }
              if(value.Date_issue==null){
                value.Date_issue= '-';
              }else{
                  value.Date_issue = value.Date_issue.slice(0, -14)
              }
          });

      }else if($scope.pdfType=='Tracking'){
          var master =  ['Vessel_id', 'V', 'Change_date', 'Change_description'];
        $scope.pdfHeading = ["Vessel ID", "Change Type", "Change Date", "Change Description"];
          angular.forEach($scope.exportdata, function(value, key){
              if(value.Vessel_id==null)
              {
                  value.Vessel_id ='-'; 
              }
              if(value.V==null){
                  value.V ='-';
              }
              if(value.Change_description==null){
                value.Change_description ='-';
              }
              if(value.Change_date==null){
                value.Change_date = '-';
              }else{
                value.Change_date  = value.Change_date.slice(0, -14);
              }
              
          });
      }




          var docDefinition = {
              content: [
                  { text: 'Dynamic parts', style: 'header' },
                  table($scope.exportdata, master)

              ]
          }

           pdfMake.createPdf(docDefinition).download('something.pdf')
     }
     //industrial openFile
     $scope.openFile = function(n){
        window.open(n.file);
     }


     //industrial init
    $scope.init = function(){
          $http.get(REMOTE+'industrial_company/')
            .then(function(response) {
                $rootScope.industrial_company = response.data;
                $scope.totalItems = $scope.industrial_company.length; 
            });

             $http.get(REMOTE+'industrial_vessel/')
            .then(function(response) {
                $rootScope.industrial_vessel = response.data;
                 $scope.totalVessels = $scope.industrial_vessel.length; 
                
            });

             $http.get(REMOTE+'industrial_vessel_all/')
            .then(function(response) {
                $scope.industrial_vessel_all = response.data;            
            });


             $http.get(REMOTE+'industrial_license/')
            .then(function(response) {
                $rootScope.industrial_license = response.data;
            });

             $http.get(REMOTE+'industrial_license_cur/')
            .then(function(response) {
                $rootScope.industrial_license_current = response.data;
                $scope.totalLicense = response.data.length; 
            });
            $http.get(REMOTE+'industrial_tracking/')
            .then(function(response) {
                $rootScope.industrial_tracking = response.data;
                $scope.totalTracking = response.data.length; 
            });
             $http.get(REMOTE+'agreement/')
            .then(function(response) {
                $scope.agreement = response.data;
                
            });
             $http.get(REMOTE+'country_flag/')
            .then(function(response) {
                $scope.flagList = response.data;
                
            });
            $http.get(REMOTE+'construction_material/')
            .then(function(response) {
                $scope.constructionList = response.data;
                
            });
            $http.get(REMOTE+'storage/')
            .then(function(response) {
                $scope.freezingList = response.data;
                
            });
            $http.get(REMOTE+'engine/')
            .then(function(response) {
                $scope.mainengineList = response.data;
                
            });
            $http.get(REMOTE+'fishing_gear/')
            .then(function(response) {
                $scope.fishing_gearList = response.data;
                
            });

            $http.get(REMOTE+'tracking_type/')
            .then(function(response){
                $scope.trackingList = response.data
            })

            $http.get(REMOTE+'vessel_type/')
            .then(function(response){
                $scope.vesselTypeList = response.data
                
            })
            //target_species
            $http.get(REMOTE+'target_species/')
            .then(function(response){
                $scope.tagetSpeciesList = response.data
                
            })
            $http.get(REMOTE+'fishing_zone/')
            .then(function(response){
                $scope.zoneList = response.data
                
            })
            $http.get(REMOTE+'mesh_size/')
            .then(function(response){
                $scope.meshsizeList = response.data
            }); 
            $http.get(REMOTE+'crewType')
            .then(function(response){
                $scope.crewTypeList = response.data;
               // console.log($scope.crewTypeList)
            })
            $http.get(REMOTE+'license_officer')
            .then(function(response){
                $scope.licenseOfficerList = response.data;
               // console.log($scope.crewTypeList)
            }) 
             $http.get(REMOTE+'replacement')
            .then(function(response){
                $rootScope.replacementHistory = response.data;
               // console.log($scope.crewTypeList)
            }) ; 

            $http.get(REMOTE+'reason')
            .then(function(response){
                $scope.reasonList = response.data
            })

          }

          $scope.tab = 1; 
          $scope.select = 1; 
          $scope.setTab = function (tabId) {
            this.tab = tabId;
          };

          $scope.isSet = function (tabId) {
            return this.tab === tabId;
          };


          $scope.setSelected = function (tabId) {
            this.select = tabId;
          };

          $scope.isSelected = function (tabId) {
            return this.select === tabId;
          };

          //sorting
          $scope.viewby = 10;
          $scope.itemsPerpageVessel = 10;
          $scope.itemsPerpageCompany = 10;
          $scope.itemsPerpageLicense = 10;
          $scope.itemsPerpageTracking = 10;


          $scope.currentPage = 1;
          $scope.currentCompany = 1; 

          $scope.currentVessel = 1; 
          $scope.currentLicense = 1; 
          $scope.currentTracking = 1; 
          $scope.numPerPage = 15;
          /*$scope.maxSize = 5;*/



          $scope.sortType     = 'Company_name'; // set the default sort type for vessel company
          $scope.sortVessel   = 'V'; // set the default sort type for industrial vessel
          $scope.sortLicense  ='License_id';  // set the default sort type for vessel license
          $scope.sortReverse  = false;  // set the default sort order for vessel company
          $scope.sortVesselReverse = false;  // set the default sort order for industrial vessel
          $scope.sortLicenseReverse = false; // set the default sort order for industrial license

          $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
          };

          $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
          };

        $scope.setItemsPerPage = function(num) {
          $scope.itemsPerPage = num;
          $scope.currentPage = 1; //reset to first paghe
        }


         $scope.read = false; 

      //industrial checklist
      $scope.checkList = {
          companies :[], 
          vessels:[], 
          licenses:[], 
          tracking:[]
      };


      //Date functions
      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };
      $scope.open3 = function() {
        $scope.popup3.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };
      $scope.popup3 = {
        opened: false
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
       // End of Date functions



      //Vessel Company Functions

      $scope.companySelect = function(){
        if($scope.company_select){
          $scope.checkList.companies = angular.copy($scope.industrial_company);
        }else{
          $scope.checkList.companies = []; 
        }
      }; 

      //Delete Company Function
      $scope.deleteCompany = function(){
        if($scope.checkList.companies.length<1){
            $scope.alertText = 'Select a company before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.companies.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };



        //$scope.customPopupSelectedOne

        //Show Vessels of Company
        $scope.showVessel = function(n){
          $scope.statusHeader = n.Company_name;
          $scope.company = n.Company_id;
          $scope.selectedVessels = []; 
          $scope.replaceList = [];
          $scope.allVessels = [];

          //$scope.industrial_vessel_all 

          angular.forEach($scope.industrial_vessel_all, function(value, key){
              if(value.Company_id===n.Company_id){
                  $scope.allVessels.push(value)
              }
          }); 

          angular.forEach($scope.industrial_vessel, function(value, key){
              if(value.Company_id===n.Company_id){
                  $scope.selectedVessels.push(value)
              }
          }); 

          angular.forEach($scope.replacementHistory, function(value, key){
            
              if(value.owner===n.Company_id){
                  $scope.replaceList.push(value)
              }
          }); 


          //console.log($scope.selectedVessels)
              $scope.statusModalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'numberofVessel.html',
                  controller: 'IndustCtrl',
                  size: 'md',
                  scope: $scope
                });
        }

        //Vessel Replacement
        $scope.replacement = {}; 
        $scope.replace_error = false; 
        
        $scope.replaceVessel= function(){
           if($scope.replacement.old_vessel===$scope.replacement.new_vessel){
              $scope.replace_error = true; 
           }else{
            $scope.replacement.owner = $scope.company;

              //console.log($scope.replacement);
            $http.post(REMOTE+'replacement', $scope.replacement).then(function(response){
                $scope.closestatus(); 
                $scope.init();
            });

           }
        }




        //Export Selected Company 
        $scope.exportCompany = function(){
          if($scope.checkList.companies.length<1){
            $scope.alertText = 'Select a company before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.exportdata = $scope.checkList.companies;
          $scope.pdfType = 'Company';
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });     
            }
        }; 


      // Export Buttons
       $scope.getArray = [{a: 1, b:2}, {a:3, b:4}];
      $scope.export = function(){
          if($scope.exportSelected=='pdf'){
            console.log($scope.exportdata)
              console.log( $scope.checkList.company);

          }
        $scope.closeExport();




      }

      $scope.closeExport = function(){
          $scope.modalExport.dismiss('cancel');
      };

      $scope.closeAlert = function(){
          $scope.modalAlert.dismiss('cancel');
      };

      $scope.closeDelete = function(){
        $scope.modalDelete.dismiss('cancel');
      };

      $scope.delete = function(){
        $scope.closeDelete();
      }

      $scope.nodelete = function(){
        $scope.closeDelete();
      }



      // vessel things

      $scope.vesselSelect = function(){
        if($scope.vessel_select){
           $scope.checkList.vessels = angular.copy($scope.industrial_vessel);  // $scope.industrial_vessel.map(function(item) { return item.V; });
         // console.log($scope.checkList.vessels)
        }else{
          $scope.checkList.vessels = []; 
        }
      }; 

      $scope.deleteVessel = function(){
        if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a vessel before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.vessels.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };

        // industrial export vessel
        $scope.exportVessel = function(){
        
          $scope.pdfType = 'Vessels'; 
          if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a vessel before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          //$scope.deleteText ='Do you want to export '+ $scope.checkList.companies.length +' items';
          $scope.exportdata = $scope.checkList.vessels;
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 
          //$scope.selectedLicenses = [];

          $scope.newtracking = {}; 
  
    $scope.$watch('customPopupSelected', function() { 
                //$scope.myAutocompleteModel = ($scope.selected && 'value' in $scope.selected) ? $scope.selected.value : null; 
            //console.log('nana');
              //console.log($scope.customPopupSelected);
              //$scope.selectedVesselName = $scope.customPopupSelected; 
              if($scope.customPopupSelected)
                    $scope.newtracking.name = $scope.customPopupSelected.Current_vessel_name
            });

        $scope.selectedType=0;
        $scope.changedItem = {};

          $scope.setType = function (tabId) {
            $scope.selectedType = tabId;
          };

          $scope.isType = function (tabId) {
            return $scope.selectedType == tabId;
          };

          $scope.changeType = function(){
             $scope.setType($scope.newtracking.type); 
          }


          $scope.showLicense = function(n){
            //console.log(n);
          $scope.statusHeader = n.Vessel_id;
          $scope.selectedLicenses = []; 
          angular.forEach($scope.industrial_license, function(value, key){
              if(value.Vessel_id===n.Vessel_id){
                
                  $scope.selectedLicenses.push(value); 

              }

          }); 
         // console.log($scope.selectedLicenses);
          //console.log($scope.selectedVessels)
              $scope.statusModalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'numberofLicense.html',
                  controller: 'IndustCtrl',
                  size: 'md',
                  scope: $scope
                });
        }




      /*$scope.export = function(){
        $scope.closeExport(); 
      }

      $scope.closeExport = function(){
          $scope.modalExport.dismiss('cancel');
      };*/
        //crew management

        $scope.newcrew = {};
        $scope.saveCrew = function(){
          
            $scope.newcrew.vessel_id = $scope.crewHeader; 
            $http.post(REMOTE+'crew', $scope.newcrew).then(function(response){
                $scope.closecrew();
                $scope.init();
                //$scope.select = 2; 
            });
        }






      // License things

      $scope.licenseSelect = function(){
        if($scope.license_select){
           $scope.checkList.licenses = $scope.industrial_license.map(function(item) { return item.License_id; });
        }else{
          $scope.checkList.licenses = []; 
        }
      }; 

      $scope.deleteLicense = function(){
        if($scope.checkList.licenses.length<1){
            $scope.alertText = 'Select a license before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.licenses.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };


        $scope.exportLicense = function(){
           $scope.pdfType = 'License'; 
          if($scope.checkList.licenses.length<1){
            $scope.alertText = 'Select a license before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.exportdata = $scope.checkList.licenses;
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 

        //industrial tracking

        $scope.trackingSelect = function(){
        if($scope.tracking_select){
           $scope.checkList.tracking = angular.copy($scope.industrial_tracking);//$scope.industrial_tracking.map(function(item) { return item.Tracking_id; });
        }else{
          $scope.checkList.tracking = []; 
        }
      }; 


       $scope.exportTracking = function(){
         $scope.pdfType = 'Tracking'; 
          if($scope.checkList.tracking.length<1){
            $scope.alertText = 'Select a tracking before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          //$scope.deleteText ='Do you want to export '+ $scope.checkList.companies.length +' items';
          $scope.exportdata = $scope.checkList.tracking;
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'IndustCtrl',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 


      $scope.new_vessel_company = function(){
        $scope.newcompany = {};
        $scope.heading_text = 'New Vessel Company';
        $scope.company_button = 'Save';
          $scope.read_ = false;
          $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'vessel_companyModal.html',
                controller: 'IndustCtrl',
                size: 'md',
                scope: $scope
              });
      };

      $scope.closeModal =function(){
            $scope.modalInstance.dismiss('cancel');
      };

      $scope.edit_vessel_company = function(d){
          $scope.heading_text = d.Company_name;
          $scope.newcompany = d;   
          $scope.company_button = 'Update';
          $scope.read_ = false; 
          $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'vessel_companyModal.html',
            controller: 'IndustCtrl',
            size: 'md',
            scope: $scope
          });
        
      };

      $scope.view_vessel_company = function(d){
          $scope.heading_text = d.Company_name; 
          $scope.companyName = d.Company_id;
          $scope.newcompany = d; 
          $scope.read_ = true;  
          $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'vessel_companyModal.html',
            controller: 'IndustCtrl',
            size: 'md',
            scope: $scope
          });
      
      };

      $scope.new_industrial_vessel = function(d){
        $scope.newvessel = {};
        $scope.newvessel.Company_id = d.Company_id
        $scope.vessel_text = 'New Industrial Vessel ' +d.Company_name;
        $scope.read_vessel = false;
        $scope.industrialModal = $uibModal.open({
            animation: true, 
            templateUrl:'newIndustrial.html', 
            controller:'IndustCtrl', 
            size:'md', 
            scope:$scope
        });
      };

      $scope.new_industrial_close = function(){
        $scope.industrialModal.dismiss('cancel');
      };

      $scope.vessel_edit = function(d){
        $scope.newvessel = d; 
          $scope.vessel_text = d.Current_vessel_name;
          $scope.read_vessel = false;
            $scope.industrialModal = $uibModal.open({
            animation: true, 
            templateUrl:'newIndustrial.html', 
            controller:'IndustCtrl', 
            size:'md', 
            scope:$scope
        });
      };

      $scope.vessel_view = function(d){
        //console.log(d);
        $scope.newvessel = d; 
        $scope.vessel_text = d.Current_vessel_name;
        $scope.read_vessel = true;
            $scope.industrialModal = $uibModal.open({
            animation: true, 
            templateUrl:'newIndustrial.html', 
            controller:'IndustCtrl', 
            size:'md', 
            scope:$scope
        });

      };

      $scope.new_industrial_license = function(){
        $scope.newlicense = {};
        $scope.licensetext = 'New Vessel License';
        $scope.read_license = false;
        $scope.industrialModal = $uibModal.open({
            animation: true, 
            templateUrl:'newLicense.html', 
            controller:'IndustCtrl', 
            size:'md', 
            scope:$scope
        })
      }; 


      $scope.license = function(d){

          $scope.newlicense = {};
          $scope.licensetext = 'Vessel : '+ d.V;
          $scope.newlicense.Vessel_id = d.V
          $scope.read_license = false;
          $scope.industrialModal = $uibModal.open({
              animation: true, 
              templateUrl:'newLicense.html', 
              controller:'IndustCtrl', 
              size:'md', 
              scope:$scope
          })
      }; 



      $scope.license_close = function(){
          $scope.industrialModal.dismiss('cancel');  
      };

      $scope.license_edit = function(d){
        $scope.newlicense = d; 
        $scope.read_license = false;
        $scope.licensetext = d.License_id; 
        $scope.industrialModal = $uibModal.open({
            animation: true, 
            templateUrl:'newLicense.html', 
            controller:'IndustCtrl', 
            size:'md', 
            scope:$scope
        });

      }; 

      $scope.license_view = function(d){
        $scope.newlicense = d; 
        $scope.read_license = true;
        $scope.licensetext = d.License_id; 
        $scope.industrialModal = $uibModal.open({
            animation: true, 
            templateUrl:'newLicense.html', 
            controller:'IndustCtrl', 
            size:'md', 
            scope:$scope
        });
      }


/*      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };


      $scope.setSelected = function (tabId) {
        this.select = tabId;
      };

      $scope.isSelected = function (tabId) {
        return this.select === tabId;
      }; */

      //$scope.newcompany = {}; 
      
     // $scope.newlicense = {};
      //$scope.newtracking = {};

      

      $scope.saveVessel = function(){
        alert('alert')
         /* var t = '';
          angular.forEach($scope.example14model, function(value, key){
              t += value.id+',';
          });*/
          console.log('ghana');
          $scope.newvessel.Nav_fish_aids = $scope.data.multipleSelect;// t.slice(0, -1); 
          console.log($scope.newvessel);

      }

      //customPopupSelectedOnes

      $scope.saveCompany = function(){
          //console.log($scope.newcompany);

         // $scope.submitForm = function() {

            // check to make sure the form is completely valid
            if ($scope.companyForm.$valid) {
                //alert('our form is amazing');
                $http.post(REMOTE+'industrial_company', $scope.newcompany).then(function(response){
                    console.log(response.data);
                    if(response.data.insert){
                      $scope.closeModal();
                    }
                })
            }

         // };

      }

      $scope.saveLicense = function(){
          console.log($scope.dt);
      }

      $scope.saveTrack = function(){
          console.log($scope.newtracking);
          //console.log($scope.customPopupSelected)
      }


      



      
      //newLicense



      $scope.new_industrial_tracking = function(){
          $scope.trackingModal = $uibModal.open({
            animation: true, 
            templateUrl:'newTracking.html', 
            controller:'IndustCtrl', 
            size:'md', 
            scope:$scope
        })
      }

      $scope.close_tracking = function(){
        $scope.trackingModal.dismiss('cancel');
      }

      $scope.crew = function(d){  
        $scope.crewHeader = d.V;

        $http.get(REMOTE+'crew/'+d.V).then(function(response){
            $scope.selectedcrewList = response.data;
        })


        $scope.crewModal = $uibModal.open({
            animation: true, 
            templateUrl:'crewmanager.html', 
            controller:'IndustCtrl', 
            size:'md', 
            scope:$scope
        })
      }; 

      $scope.closecrew = function(){
        $scope.crewModal.dismiss('cancel');
      };

      $scope.status = function(d)
      {
            $scope.statusHeader = d.V;
            $scope.vessel_id = d.V;
            $scope.status.Change_type = 'Inactive'; 
            $scope.statusModalInstance = $uibModal.open({
              animation: true, 
              templateUrl:'statusModal.html', 
              controller:'IndustCtrl', 
              size:'md', 
              scope:$scope
          })
      }; 
      $scope.statusChange = {};

          $scope.saveStatus =function(){
            alert('ghana');
           
         /* var th = {
              statement: "Vessel_status ='"+$scope.statusChange.Change_type+"'", 
              Vessel_id: $scope.vessel_id, 
              Change_type: '8', 
              Change_description: $scope.statusChange.Change_description, 
              Change_date: $scope.statusChange.Change_date
          }


          $http.put(REMOTE+'industrial_vessel/'+ $scope.vessel_id, th).then(function(response){
              $scope.closestatus();
              $scope.init();
          }); 
          $scope.statusChange.Vessel_id = $scope.vessel_id; 
          $scope.statusChange.Change_type = '8';  */
          //$scope.statusChange.Change_description = 

          /*$http.post(REMOTE+'industrial_tracking', $scope.statusChange).then(function(respons){

          })*/
      }; 


      $scope.closestatus = function(){
        $scope.statusModalInstance.dismiss('cancel');
      }


            
})

