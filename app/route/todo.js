'use strict';

todo.config(
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('todo', {
                url: '/{status}',
                templateUrl: 'app/view/todo.html',
                controller: 'TodoCtrl'
            });
    }
);
