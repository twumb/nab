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
   .constant('REMOTE', 'http://localhost:8010/api/')
  //.constant('REMOTE', 'http://icgc.etribegh.com:8010/api/')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'views/sign.html', 
                controller:'LoginController'
            }).
             state('app', {
                url:'/app',
                abstract:true, 
                templateUrl:'views/main.html', 
                controller:'MasterController'
             })
             .state('app.dashboard', {
                url:'/dashboard',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/dashboard.html', 
                                controller: 'DashController'
                              }
                        }
             })
              .state('app.institution', {
                url: '/institution',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/institutions.html', 
                                controller: 'InstitutionController'
                              }
                        }
            })
             .state('app.search', {
                url: '/search',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/search.html', 
                                controller: 'SearchController'
                              }
                        }

            })
            .state('app.reports',{
              url: '/reports',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/reports.html', 
                                controller: 'ReportController'
                              }
                        }

            })
            .state('app.setup',{
              url: '/setup',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/setup.html', 
                                controller: 'SetupController'
                              }
                        }

            });
    }
])
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
})
