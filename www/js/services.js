
/* Services */

var jobServices = angular.module('jobServices', ['ngResource']);

/* Service - Job */

jobServices.factory('Job', ['$resource',

    function($resource) {

        return $resource('data/job-:jobId.json', {}, {

            query: { method:'GET', params:{ jobId:'list'}, isArray:true },
            get:   { method:'GET', params:{ jobId:'2'}, isArray:false }
        });
    }
]);
