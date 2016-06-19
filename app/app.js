/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todo = angular.module('todo', [
    //加载动画效果
    'ngAnimate',

    //ui-route
    'ui.router'
]);


todo.run(function($http, $rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })
    .config(function($urlRouterProvider) {
        'use strict';

        //无效的链接跳转到首页
        $urlRouterProvider
            .otherwise('/');
    });
