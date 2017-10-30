angular.module('app.controllers')
    .controller('loginController', function($scope, $state, $cookies){
        $scope.loginModel = {userName: '', password: ''};
        $scope.login = function(){
            if($scope.loginModel.userName) {
                $cookies.put('auth', $scope.loginModel)
                $state.go('home.productCatalog')
            }
        }
    });