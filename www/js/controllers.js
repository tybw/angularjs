
/* Module */

/* The controllers - jobControllers */

var jobControllers = angular.module('jobControllers', []);

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

