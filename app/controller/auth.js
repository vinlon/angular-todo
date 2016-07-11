/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todo.controller('AuthCtrl', ['$scope', '$state', '$stateParams', '$filter', 'auth',
    function TodoCtrl($scope, $state, $stateParams, $filter, auth) {
        'use strict';
        //登录
        $scope.dataLoading = false;
        $scope.login = function() {
            $scope.dataLoading = true;
            auth.login($scope.user.username, $scope.user.password).then(function(response) {
                if (response.return_code == 200) {
                    $state.go('todo');
                } else {
                    $scope.error = response.return_msg;
                }
            }).finally(function() {
                $scope.dataLoading = false;
            });
        };

        $scope.logout = function() {
            auth.logout().then(function(response) {
                if (response.return_code == 200) {
                    $state.go('login');
                } else {
                    $scope.error = response.return_msg;
                }
            });
        };

    }
]);
