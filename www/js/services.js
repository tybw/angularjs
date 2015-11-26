
/* Services */

var jobServices      = angular.module('jobServices', ['ngResource']);
var authServices     = angular.module('authServices', ['ngResource']);
var eurocorpServices = angular.module('eurocorpServices', ['ngResource']);

/* Service - Job */

jobServices.factory('Job', ['$resource',

    function($resource) {

        return $resource('data/job-:jobId.json', {}, {

            query: { method:'GET', params:{ jobId:'list'}, isArray:true },
            get:   { method:'GET', params:{ jobId:'2'}, isArray:false }
        });
    }
]);

/* Service - Login */

authServices.factory('Auth', ['$resource',

    function($resource) {
        return $resource('http://eurocorp.localhost/:operation',
            {
                /* callback: "JSON_CALLBACK" */
            },
            {
                signin:  { method:'POST', params:{ operation:'login_check' }},
                signout: { method:'POST', params:{ operation:'logout' }},
                refresh: { method:'POST', params:{ operation:'refresh' }}
            }
        );
    }
]);

authServices.factory('SessionHandler', ['localStorageService','$cookies',

    function() {
        var myId = localStorageService.get('myId');
        var phpSessionId = localStorageService.get('phpSessionId');

        myId = '5';
        phpSessionId = 'sn1gcf6nu8hus7gv5linjsk2o7';
        hfm = 'V2ViZml0XEV1cm9jb3JwXFNlY3VyaXR5QnVuZGxlXEVudGl0eVxVc2VyOllXUnRhVzVBZDJWaVptbDBMbU52TG01NjoxNDc5Nzc2MzMzOjg1MzkwMTUwNTA0OWQyNGJhNWQwMTY0YzIyZjA2Mjc1OGEzOTVkMzYxYmRlMTk0MDFiMWM5MWI3NDEwYmMwZDQ%3D';

        $cookies.put('HFM', hfm);
        $cookies.put('PHPSESSID', phpSessionId);
    }
]);

authServices.factory('TokenHandler',
    function() {
    }
);

/* Service - Eurocorp */

eurocorpServices.factory('Eurocorp', ['$resource',

    function($resource) {

        return {
            customerJobs: $resource('http://eurocorp.localhost/api/customers/:customerId/jobs',
                { status: '@status' },
                { get: {method: 'GET', params: {}, isArray: true}}
            ),
            customer: $resource('http://eurocorp.localhost/api/customers/:customerId',
                {},
                { get: {method: 'GET', params: {}, isObject: true}}
            ),
            customers: $resource('http://eurocorp.localhost/api/:operation',
                {},
                { get: {method: 'GET', params: {operation: 'customers'}, isArray: true}}
            ),
            job: $resource('http://eurocorp.localhost/api/jobs/:jobId',
                { jobId: '@jobId' },
                { get: {method: 'GET', params: {}, isObject: true}}
            ),
            schedule: $resource('http://eurocorp.localhost/api/schedules/:scheduleId',
                {},
                { get: {method: 'GET', params: {scheduleId: '@schedule_id'}, isObject: true}}
            ),
            representative: $resource('http://eurocorp.localhost/api/jobs/:jobId/representatives',
                {},
                { get: {method: 'GET', params: {jobId: '@job_id'}, isObject: true}}
            ),
            detailer: $resource('http://eurocorp.localhost/api/jobs/:jobId/detailers',
                {},
                { get: {method: 'GET', params: {jobId: '@job_id'}, isObject: true}}
            ),
            despatcher: $resource('http://eurocorp.localhost/api/jobs/:jobId/despatchers',
                {},
                { get: {method: 'GET', params: {jobId: '@job_id'}, isObject: true}}
            ),
            /* Miscellenance job information which is not available directly from database */

            jobInfo: $resource('http://eurocorp.localhost/api/jobs/:jobId/information',
                { status: '@status' },
                { get: {method: 'GET', params: {jobId: '@job_id'}, isObject: true}}
            ),
            sheetInfo: $resource('http://eurocorp.localhost/api/sheets/:sheetId/information',
                {},
                { get: {method: 'GET', params: {sheetId: '@sheet_id'}, isObject: true}}
            ),
            jobSchedules: $resource('http://eurocorp.localhost/api/jobs/:jobId/schedules',
                {},
                { get: {method: 'GET', params: {jobId: '@job_id'}, isObject: true}}
            ),
        };
    }
]);
