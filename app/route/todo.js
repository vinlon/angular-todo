'use strict';

todo.config(
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('todo', {
                url: '/{status}',
                resolve: {
                    store: function(todoStorage) {
                        // Get the correct module (API or localStorage).
                        return todoStorage.then(function(module) {
                            module.get(); // Fetch the todo records in the background.
                            return module;
                        });
                    }
                },
                templateUrl: 'app/view/index.html',
                controller: 'TodoCtrl'
            });
    }
);
