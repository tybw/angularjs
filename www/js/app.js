
var helloworldApp = angular.module('helloworldApp', [
    'ngRoute',
    'helloworldController'
]);

helloworldApp(['$routeProvider',
    function($routeProvider) {

        when('/', {
            templateUrl: 'views/main.html',
            controller:  'JobListController'
        }).

        when('/job/:jobId', {
            templateUrl: 'views/job_detail.html',
            controller:  'JobDetailController'
        }).

        otherwise(
            redirectTo: '/';
        );
    }
]);
