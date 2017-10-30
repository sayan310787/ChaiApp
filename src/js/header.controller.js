angular.module('app.controllers')
    .controller('headerController', function($scope, $state, $cookies){

        $scope.logout = function () {
            $cookies.remove('auth');
            $state.go('login');
        }

        $scope.navigate = function (state) {
            $state.go(state);
        }
        $scope.$state = $state;
    })