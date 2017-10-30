angular.module('app.service')
    .factory('apiService', function($http){
        var url = 'http://chaiontime.us-east-2.elasticbeanstalk.com/dashboard/';
        function getAllCatalog(){
            return $http.get(url + 'catalogues').then(function (response) {
                return response.data;
            }).catch(function(error){
                return error;
            })
        }
        function editCatalog(payload){
            return $http.patch(url + 'catalogue', payload).then(function(response){
                return response.data;
            }).catch(function(error){
                return error;
            })
        }
        function addCatalog(payload){
            return $http.put(url + 'catalogue', payload).then(function(response){
                return response.data;
            }).catch(function(error){
                return error;
            })
        }
        function deleteCatalog(catalogId){
            return $http.delete(url + 'catalogue/'+catalogId).then(function(response){
                return response.data;
            }).catch(function(error){
                return error;
            })
        }
        function deleteProduct(productId){
            return $http.delete(url + 'product/'+productId).then(function(response){
                return response.data;
            }).catch(function(error){
                return error;
            })
        }
        function editProduct(payload){
            return $http.patch(url + 'product', payload).then(function(response){
                return response.data;
            }).catch(function(error){
                return error;
            })
        }
        function addProduct(payload){
            return $http.put(url + 'product', payload).then(function(response){
                return response.data;
            }).catch(function(error){
                return error;
            })
        }
        function getProductFromCatalog(catalogId){
            return $http.get(url + 'catalogue/'+catalogId).then(function(response){
                return response.data;
            }).catch(function(error){
                return error;
            })
        }
        return {
            getAllCatalog: getAllCatalog,
            editCatalog: editCatalog,
            addCatalog: addCatalog,
            deleteCatalog: deleteCatalog,
            deleteProduct: deleteProduct,
            editProduct: editProduct,
            addProduct: addProduct,
            getProductFromCatalog: getProductFromCatalog
        }
    })