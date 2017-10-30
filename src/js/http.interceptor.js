angular.module('app.core')
.config(function ($httpProvider){
    $httpProvider.interceptors.push('requestHeader')
})
    .factory('requestHeader', function(appService, $base64){
        return {request: function(config){
            if(appService.getAuthentication()) {
                var auth  = $base64.encode("vivek:password");
                config.headers['Content-Type'] =  'application/json'
                config.headers['Authorization'] = 'Basic ' + auth
            }
            return config
        }}
    })