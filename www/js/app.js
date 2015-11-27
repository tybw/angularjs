/*
 * The app - helloworldApp
 *
 * It defines routes and controllers.
 *
 */
var helloworldApp = angular.module('helloworldApp', [
    'ngRoute',
    'jobControllers',
    'jobServices',
    'jobAnimations',
    'eurocorpControllers',
    'eurocorpServices',
    'authControllers',
    'authServices',
    'LocalStorageModule',
    'ngCookies'
]);

/* Constants */

helloworldApp.constant('authApiEndpointLogin', 'http://eurocorp.localhost');

/*
  Routings

  For each route, one controller is defined:
  - jobListCtrl
  - jobDetailCtrl
*/
helloworldApp.config(['$routeProvider',

    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller:  'jobListCtrl'
            }).

            when('/job/:jobId', {
                templateUrl: 'views/job_detail.html',
                controller:  'jobDetailCtrl'
            }).

            when('/signin', {
                templateUrl: 'views/signin.html',
                controller: 'authCtrl'
            }).

            when('/eurocorp', {
                templateUrl: 'views/eurocorp/index.html',
                controller: 'eurocorpCtrl'
            }).

            /* List of customers */
            when('/eurocorp/customers', {
                templateUrl: 'views/eurocorp/customers.html',
                controller: 'eurocorpCustomersCtrl'
            }).

            /* A customer detail */
            when('/eurocorp/customers/:customerId', {
                templateUrl: 'views/eurocorp/customer.html',
                controller: 'eurocorpCustomerCtrl'
            }).

            /* List of jobs of a customers */
            when('/eurocorp/customers/:customerId/jobs', {
                templateUrl: 'views/eurocorp/jobs.html',
                controller: 'eurocorpCustomerJobsCtrl'
            }).

            /* List of schedules */
            when('/eurocorp/jobs/:jobId/schedules', {
                templateUrl: 'views/eurocorp/schedules.html',
                controller: 'eurocorpJobSchedulesCtrl'
            }).

            /* List of sheets */
            when('/eurocorp/schedules/:scheduleId/sheets', {
                templateUrl: 'views/eurocorp/sheets.html',
                controller: 'eurocorpScheduleSheetsCtrl'
            }).

            /* Sheet detail */
            when('/eurocorp/sheets/:sheetId', {
                templateUrl: 'views/eurocorp/sheet.html',
                controller: 'eurocorpSheetCtrl'
            }).

            otherwise({
                redirectTo: '/'
            });
    }
]);

helloworldApp.config(

    function(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('eurocorp')
            .setStorageCookie(0, '/')
            .setStorageType('sessionStorage')
            .setStorageCookieDomain(window.location);
    }
);

helloworldApp.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }
]);
