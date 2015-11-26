/*
 *  Module
 */

/* The controllers - jobControllers */

var jobControllers      = angular.module('jobControllers', []);
var authControllers     = angular.module('authControllers', []);
var eurocorpControllers = angular.module('eurocorpControllers', []);

/* Controllers */
/* We can use low-level $http way, but the service way is much better */

/* Using service */

jobControllers.controller('jobListCtrl', ['$scope', 'Job',

    function($scope, Job) {
        $scope.orderOptions = 'id';
        $scope.jobs = Job.query();
    }
]);

jobControllers.controller('jobDetailCtrl', ['$scope', '$routeParams', 'Job',

    function($scope, $routeParams, Job) {

        $scope.job = [];
        $scope.job = Job.get({ jobId: $routeParams.jobId }, function() {});
    }
]);

/* Auth controllers */

authControllers.controller( 'authCtrl', [
    '$scope', 'Auth', 'localStorageService',
    function($scope, Auth, localStorageService) {

        function handleRequest(req) {
            var token = req.data ? req.data.token : null;
            console.log(token);
        }

        $scope.signin = function() {
            status = Auth.signin($scope.username, $scope.password);
            if (status) {
                localStorageService.set('token', 'NQc7B8gqum2tmq3LexphZjuF4usvVr97caHcMqud4Pc');
                console.log('Sign-in ok!');
            } else {
                localStorageService.set('token', '');
                console.log('Sign-in failed!');
            }
        }

        $scope.signout = function() {
            localStorageService.set('token', '');
            return Auth.signout($scope.username);
        }

        $scope.refresh = function() {
            return Auth.refresh($scope.username, $scope.token);
        }
    }
]);

/* Eurocorp controllers */

eurocorpControllers.controller( 'eurocorpCtrl', [
    '$scope',
    function($scope) {
    }
]);

eurocorpControllers.controller( 'eurocorpCustomerCtrl', [
    '$scope',
    function($scope) {
    }
]);

/**
 * List of jobs of a customer
 */
eurocorpControllers.controller( 'eurocorpCustomerJobsCtrl', [
    '$scope',
    '$routeParams',
    'Eurocorp',
    function($scope, $routeParams, Eurocorp) {

        $scope.jobInfo = {};
        $scope.jobs = Eurocorp.customerJobs.get({
                customerId: $routeParams.customerId,
                status: $routeParams.status
            },
            function(result) {
                result.forEach(function(entry) {
                    console.log(entry);
                    $scope.jobInfo[entry.id] = Eurocorp.jobInfo.get({
                            jobId: entry.id,
                            status: $routeParams.status
                        },
                        function() {
                        });
                });
            }
        );

        $scope.customer = Eurocorp.customer.get({
                customerId: $routeParams.customerId,
            }
        );
    }
]);

eurocorpControllers.controller( 'eurocorpCustomersCtrl', [

    '$scope',
    'Eurocorp',
    'Auth',
    '$cookies',
    '$cookieStore',
    'localStorageService',

    function($scope, Eurocorp, $cookies, $cookieStore, localStorageService) {

        /*
        var myId = localStorageService.get('myId');
        var phpSessionId = localStorageService.get('phpSessionId');

        myId = '5';
        phpSessionId = 'sn1gcf6nu8hus7gv5linjsk2o7';
        hfm = 'V2ViZml0XEV1cm9jb3JwXFNlY3VyaXR5QnVuZGxlXEVudGl0eVxVc2VyOllXUnRhVzVBZDJWaVptbDBMbU52TG01NjoxNDc5Nzc2MzMzOjg1MzkwMTUwNTA0OWQyNGJhNWQwMTY0YzIyZjA2Mjc1OGEzOTVkMzYxYmRlMTk0MDFiMWM5MWI3NDEwYmMwZDQ%3D';

        $cookies.put('HFM', hfm);
        $cookies.put('PHPSESSID', phpSessionId);
        */

        $scope.customers = Eurocorp.customers.get();
    }
]);

/**
 * List of schedules of a job
 */
eurocorpControllers.controller( 'eurocorpJobSchedulesCtrl', [
    '$scope',
    '$routeParams',
    'Eurocorp',
    function($scope, $routeParams, Eurocorp) {

        $scope.job = Eurocorp.job.get({
            jobId: $routeParams.jobId
        }, function() {});
    }
]);

/**
 * Sheet page: List of sheets of a schedule plus other details
 */
eurocorpControllers.controller( 'eurocorpScheduleSheetsCtrl', [
    '$scope',
    '$routeParams',
    'Eurocorp',
    function($scope, $routeParams, Eurocorp) {

        $scope.schedule = Eurocorp.schedule.get({
            scheduleId: $routeParams.scheduleId
        }, function(schedule) {

            $scope.job = Eurocorp.job.get({
                jobId: schedule.job_id.id
            }, function(job) {
                $scope.representative = Eurocorp.representative.get({
                    jobId: schedule.job_id.id
                }, function() {});
                $scope.detailer = Eurocorp.detailer.get({
                    jobId: schedule.job_id.id
                }, function() {});

                $scope.despatcher = Eurocorp.despatcher.get({
                    jobId: schedule.job_id.id
                }, function() {});
            });
        });
/*
        $scope.sheetInfo = Eurocorp.sheetInfo.get({
            scheduleId: $routeParams.scheduleId
        }, function() {});
*/
    }
]);

/* Using $http method */

/*
jobControllers.controller('jobListCtrl', ['$scope', '$http',

    function($scope, $http) {

        $scope.orderOptions = 'id';

        $scope.jobs = [
            {'id': '8', 'name': 'Run'},
            {'id': '9', 'name': 'Eat'},
            {'id': '2', 'name': 'Sleep'},
            {'id': '3', 'name': 'Stand'}
        ];

        $http.get('data/job-list.json')
            .success(function(data) {
                $scope.jobs = data;
            });
    }
]);

jobControllers.controller('jobDetailCtrl', ['$scope', '$routeParams', '$http',

    function($scope, $routeParams, $http) {

        $scope.job = [];

        $http.get('data/job-' + $routeParams.jobId + '.json')
            .success(function(data) {
                $scope.job = data;
            });
    }
]);
*/

