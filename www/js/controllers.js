var helloworldApp = angular.module('helloworldApp', []);

helloworldApp.controller('helloworldController', function($scope) {
    $scope.jobs = [
        {'id': '8', 'name': 'Run'},
        {'id': '9', 'name': 'Eat'},
        {'id': '2', 'name': 'Sleep'},
        {'id': '3', 'name': 'Stand'}
    ];

    $scope.orderOptions = 'id';
});