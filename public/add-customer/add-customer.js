(function() {
    angular.module('qudini.QueueApp')
        .directive('addCustomer', AddCustomer)


    function AddCustomer($http) {
        return {
            restrict: 'E',
            scope: {
                onAdded: '&'
            },
            templateUrl: '/add-customer/add-customer.html',
            link: function(scope) {
                scope.disabled = true;

                scope.products = [{
                    name: 'Grammatical advice'
                }, {
                    name: 'Magnifying glass repair'
                }, {
                    name: 'Cryptography advice'
                }];

                scope.setDisabled = function() {
                    if (scope.name.length && scope.product && scope.product.name.length) {
                        scope.disabled = false;
                    } else {
                        scope.disabled = true;
                    }
                };

                scope.addCustomer = function() {

                    var data = {
                        'name': scope.name,
                        'product': {
                            'name': scope.product.name
                        }
                    };

                    $http({
                        url: '/api/customer/add',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    }).then(function(res) {
                        scope.name     = '';
                        scope.disabled = true;

                        scope.onAdded();
                    });
                }
            }
        }
    }

})()
