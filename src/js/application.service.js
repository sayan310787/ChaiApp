angular.module('app.core')
    .factory('appService', function($cookies){

        function getAuthentication(){
            var status = $cookies.get('auth');
            if(status){
                return true;
            }else{
                return false;
            }
        }

        return{
            getAuthentication: getAuthentication
        }
    });