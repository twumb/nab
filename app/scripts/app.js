'use strict';

/**
 * @ngdoc overview
 * @name fishApp
 * @description
 * # fishApp
 *
 * Main module of the application.
 */
angular
  .module('fishApp', [
     'ui.bootstrap', 'ui.router', 'ngCookies', 'chart.js', 'angular.morris-chart', 'angular.filter', 'checklist-model','angularUtils.directives.dirPagination', 'angular-md5', 'angularSpinner', 'ngSanitize', 'ngCsv', 'angular-loading-bar', 'ngFileUpload', 'angularjs-dropdown-multiselect'
  ])
  .run(function($rootScope){
    $rootScope.headingData = 'Dashboard';
    $rootScope.bread = 'Dashboard';
    $rootScope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };
  })
  .constant('REMOTE', 'http://localhost:8050/api/')
  //.constant('REMOTE', 'http://icgc.etribegh.com:8050/api/')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'views/sign.html', 
                controller:'LoginCtrl'
            }).
            state('active_industrial', {
                url: '/active_industrial',
                templateUrl: 'views/actind.html', 
                controller:'ActiveCtrl'
            })
            .state('active_semi_industrial', {
                url: '/active_semi_industrial',
                templateUrl: 'views/actsemi.html', 
                controller:'ActiveCtrl'
            }).

             state('app', {
                url:'/app',
                abstract:true, 
                templateUrl:'views/main.html', 
                controller:'MasterCtrl'
             }).
             state('app.dashboard', {
                url:'/dashboard',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/dashboard.html', 
                                controller: 'DashCtrl'
                              }
                        }
             })

              .state('app.tables', {
                url: '/tables',
                //templateUrl: 'views/tables.html', 
                //controller:'EnteriesCtrl'
                views:{
                           'contentArea':{ 
                                templateUrl:'views/tables.html', 
                                controller: 'EnteriesCtrl'
                              }
                        }
            })
             .state('app.setup', {
                url: '/setup',
                //templateUrl: 'views/setup.html', 
                //controller:'SetupCtrl'
                views:{
                           'contentArea':{ 
                                templateUrl:'views/setup.html', 
                                controller: 'SetupCtrl'
                              }
                        }

            })
             //starting proper 
            .state('app.industrial',{
              url: '/industrial',
                /*views:{
                           'contentArea':{ 
                                templateUrl:'views/industrial.html', 
                                controller: 'IndustrialCtrl'
                              }
                        }*/
                views:{
                           'contentArea':{ 
                                templateUrl:'views/indust.html', 
                                controller: 'IndustCtrl'
                              }
                        }

            })

            .state('app.administrator',{
              url: '/administrator',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/administrator.html', 
                                controller: 'AdminCtrl'
                              }
                        }

            })

            .state('app.semi-industrial',{
              url: '/semi-industrial',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/semi-industrial.html', 
                                controller: 'SemiIndustrialCtrl'
                              }
                        }
            

            })
            .state('app.marine',{
              url: '/marine',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/marine.html', 
                                controller: 'MarineCtrl'
                              }
                        }
            

            })
            .state('app.mcs',{
              url: '/mcs',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/mcs.html', 
                                controller: 'McsCtrl'
                              }
                        }
            

            })
            .state('app.datareporting',{
              url: '/datareporting',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/datareporting.html', 
                                controller: 'DataReportingCtrl'
                              }
                        }
            

            })
            .state('app.auxiliary',{
              url: '/auxiliary',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/auxiliary.html', 
                                controller: 'AuxiliaryCtrl'
                              }
                        }
            

            })
            .state('app.register',{
              url: '/register',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/register.html', 
                                controller: 'RegisterCtrl'
                              }
                        }
            

            })

             ;
    }
]);
