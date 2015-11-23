
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

authServices.factory('TokenHandler',

    function() {
    }
);

/* Service - Eurocorp */

eurocorpServices.factory('Eurocorp', ['$resource',

    function($resource) {
        return $resource('http://eurocorp.localhost/api/:operation',
            {},
            {
                customers: { method:'GET', params:{ operation:'customers' }, isArray: true}
            }
        );
    }
]);
