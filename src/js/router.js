angular.module('app.core')
    .run(function ($rootScope, $location, appService, $state) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if(toState.authentication){
                if(!appService.getAuthentication()){
                    event.preventDefault();
                    $state.go('login')
                }
            }
            if(toState.url == '/login'){
                if(appService.getAuthentication()){
                    if(fromState.name != "") {
                        event.preventDefault();
                        $state.go(fromState.name)
                    }
                }
            }
        })
    })

.config(function($stateProvider, $urlRouterProvider)
{
    $stateProvider
        .state('login',{
            url: "/login",
            views: {
                "main" : {templateUrl: 'src/view/login.html', controller: 'loginController'},
                "footer": {templateUrl: 'src/view/footer.html'}
            }
        })
        .state('home',{
            url: "/home",
            views: {
                "header": {templateUrl: 'src/view/header.html', controller: 'headerController'},
                "main" : {templateUrl: 'src/view/home.html'},
                "footer": {templateUrl: 'src/view/footer.html'}
            },
            authentication: true
        })
        .state('home.productCatalog',{
            url: "/productCatalog",
            views: {
              "body":{templateUrl: 'src/view/productCatalog.html', controller: 'productCatalogController'}
            },
            authentication: true
        })
        .state('home.customerManagement',{
            url: "/customerManagement",
            views: {
               "body":{templateUrl: 'src/view/customerManagement.html', controller: 'customerManagementController'}
            },
            authentication: true
        })
        .state('home.posManagement',{
            url: "/posManagement",
            views: {
               "body":{templateUrl: 'src/view/posManagement.html', controller: 'posManagementController'}
            },
            authentication: true
        })
        .state('home.reportByPos',{
            url: "/reportByPos",
            views: {
               "body":{templateUrl: 'src/view/reports.html', controller: 'reportsController'}
            },
            resolve:{

            },
            authentication: true
        })
        .state('home.addNewOffers',{
            url: "/addNewOffers?userId",
            views: {
               "body":{templateUrl: 'assets/views/addEditUserOffer.html',
                       controller: 'addEditOffersController'}
            }
        })
        .state('home.addRedemptionOffers',{
            url: "/addRedemptionOffers?userId",
            views: {
                "body":{templateUrl: 'assets/views/addEditRedemptionOffer.html',
                    controller: 'addEditRedemptionController'}
            }
        })
        .state('home.redemptionOffersList',{
            url: "/redemptionOffersList",
            views: {
                "body":{templateUrl: 'assets/views/redemptionOffer.html',
                    controller: 'redemptionOffersController'}
            }
        })
        .state('home.addAdmin',{
            url: "/addAdmin?userId",
            views: {
                "body":{templateUrl: 'assets/views/addAdmin.html',
                    controller: 'addAdminController'}
            }
        })
        .state('home.editAdmin',{
            url: "/editAdmin",
            views: {
                "body":{templateUrl: 'assets/views/editAdmin.html',
                    controller: 'editAdminController'}
            }
        })
        .state('home.changePassword',{
            url: "/changePassword",
            views: {
                "body":{templateUrl: 'assets/views/changePassword.html',
                    controller: 'changePasswordController'}
            }
        })
    $urlRouterProvider.otherwise('login');
});