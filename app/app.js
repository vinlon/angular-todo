/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todo = angular.module('todo', [
    //加载动画效果
    'ngAnimate',
    'ngCookies',
    //ui-route
    'ui.router'
]);


todo.run(function($http, $cookies, $rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // keep user logged in after page refresh
    $rootScope.globals = JSON.parse($cookies.get('globals') || '{}');
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
        // redirect to login page if not logged in
        if (toState.name !== 'login' && !$rootScope.globals.currentUser) {
            $state.go('login');
        }
        //如果进入登录页时检测到已登录，则直接跳转到首页
        if(toState.name == 'login' && $rootScope.globals.currentUser){
            $state.go('todo');
        }
    });
})

.config(function($urlRouterProvider) {
    'use strict';

    //无效的链接跳转到登录页
    $urlRouterProvider
        .otherwise('/login');
});
