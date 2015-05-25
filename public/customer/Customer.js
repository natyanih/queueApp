(function() {
    angular.module('qudini.QueueApp')
        .directive('customers', Customers)

    /**
     * The <customer> directive is responsible for:
     * - serving customer
     * - calculating queued time
     * - removing customer from the queue
     */
    function Customers($http) {

        return {
            restrict: 'E',
            scope: {
                customers: '=',
                customersServed: '=',
                queue: '=',
                onRemoved: '&',
                onServed: '&'
            },
            templateUrl: '/customer/customer.html',
            link: function(scope) {

                // calculate how long the customer has queued for
                scope.queuedTime = function(customer) {
                    return new Date() - new Date(scope.customer.joinedTime);
                };

                scope.serveCustomer = function(customer) {
                    scope.customersServed.push(customer);
                    scope.customers = _.without(scope.customers, customer);

                    // persist to DB
                    // TODO: catch errors
                    $http({
                        'method': 'POST',
                        'url': '/api/customer/serve',
                        'params': {
                            'id': customer.id
                        }
                    }).then(function(res) {
                        console.log(res);
                    });
                };

                scope.deleteCustomer = function(customer) {
                    scope.customers = _.without(scope.customers, customer);

                    // persist to database
                    // TODO: catch errors
                    $http({
                        'method': 'DELETE',
                        'url': '/api/customer/remove',
                        'params': {
                            'id': customer.id
                        }
                    }).then(function(res) {
                        console.log(res);
                        scope.onRemoved();
                    });

                };
            }
        }
    }

})()
