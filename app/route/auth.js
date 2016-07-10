'use strict';

todo.config(
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/view/login.html',
                controller: 'AuthCtrl'
            });
    }
);
