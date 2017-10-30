angular.module('app.controllers')
    .controller('productCatalogController', function($scope, $state, $http, apiService){
        var selectedCatalog = {};
        function init(){
            $scope.toggleValue = true;
            $scope.formHeader = 'Catalog';
            $scope.catalogView = true;
            $scope.catalogModel = {};
            $scope.productModel = {};
            $scope.isCatalogEdit = false;
            $scope.isProductEdit = false;
            getAllCatalog();
        }
        function getAllCatalog(){
            apiService.getAllCatalog().then(function(data){
                if(data ) {
                    $scope.allCatalog = data;
                }
            })
        }
        function getProductForCatalog(catalogId){
            apiService.getProductFromCatalog(catalogId).then(function(data){
                if(data && data.products)
                $scope.allProduct = data.products;
            })
        }
        $scope.switchView = function (catalog) {
            $scope.toggleValue = !$scope.toggleValue;
            if($scope.toggleValue){
                $scope.formHeader = 'Catalog';
                $scope.catalogView = true;
            }else{
                $scope.formHeader = 'Product';
                $scope.catalogView = false;
                $scope.allProduct = catalog.products;
                selectedCatalog = catalog;
                /*$scope.selectedCatalog.catalogueId = catalog.catalogueId;
                $scope.selectedCatalog.catagogueName = catalog.catagogueName;
                $scope.selectedCatalog.description = catalog.description;
                $scope.selectedCatalog.imageId = catalog.imageId;
                $scope.selectedCatalog.parent = catalog.parent;*/
            }
        }
        $scope.editCatalog = function(editCat){
            $scope.catalogModel = editCat;
            $scope.isCatalogEdit = true;
        }
        $scope.resetCatalogForm = function(){
            $scope.catalogModel = {};
            $scope.isCatalogEdit = false;
            $scope.addEditCatalogForm.$setPristine();
        }
        $scope.submitCatalogForm = function (payload) {
            if($scope.isCatalogEdit){
                apiService.editCatalog(payload).then(function(response){
                    $scope.resetCatalogForm();
                    getAllCatalog();
                })
            }else{
                payload.products = [];
                apiService.addCatalog(payload).then(function(response){
                    $scope.resetCatalogForm();
                    getAllCatalog();
                })
            }
        }
        $scope.deleteCatalog = function(catalog){
            apiService.deleteCatalog(catalog.catalogueId).then(function(response){
                getAllCatalog();
            })
        }
        $scope.addProduct = function(){
            $scope.productModel.catagogueName = selectedCatalog.catagogueName;
            $scope.productModel.catalogueId = selectedCatalog.catalogueId
        }
        $scope.editProduct = function(product){
            $scope.productModel = product;
            $scope.productModel.catagogueName = $scope.selectedCatalog.catagogueName;
            $scope.isProductEdit = true;
        }
        $scope.deleteProduct = function (product) {
            apiService.deleteProduct(product.productId).then(function(response){
                getProductForCatalog(product.catalogueId)
                getAllCatalog();
            })
        }
        $scope.submitProductForm = function (payload) {
            var catalog =  selectedCatalog;
            if($scope.isProductEdit){
                _.forEach(catalog.products, function (eachProd) {
                    if(eachProd.productId == payload.productId){
                        angular.merge(eachProd, payload);
                    }
                })
                apiService.editCatalog(catalog).then(function(response){
                    $scope.resetProductForm();
                    getProductForCatalog(catalog.catalogueId)
                    getAllCatalog();
                })
            }else{
                catalog.products.push(payload);
                apiService.editCatalog(catalog).then(function(response){
                    $scope.resetProductForm();
                    getProductForCatalog(catalog.catalogueId)
                    getAllCatalog();
                })
            }
        }
        $scope.resetProductForm = function () {
            $scope.productModel = {};
            $scope.isProductEdit = false;
            $scope.addEditProductForm.$setPristine();
        }
        init();

    })