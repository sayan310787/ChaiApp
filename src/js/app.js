'use strict';
// Declare app level module which depends on filters, and services
angular.module('app.controllers', []);
angular.module('app.core', []);
angular.module('app.service', []);
angular.module('app', [
    'ui.router',
    'ngCookies',
    'app.core',
    'app.controllers',
    'app.service',
    'ui.toggle',
    'base64'
])
    .controller('appController', function($scope, $state, $location, $window){
        function init() {

        }
        init();
    });