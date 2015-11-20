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
    'authControllers',
    'authServices'
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

            otherwise({
                redirectTo: '/'
            });
    }
]);
