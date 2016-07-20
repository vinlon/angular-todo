/*global angular */

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
todo.directive('todoFocus', function todoFocus($timeout) {
    'use strict';
    //切换到编辑模式后自动获取焦点
    return function(scope, elem, attrs) {
        //delay为0时，focus效果不是很稳定，原因不明
        var delay = 100;
        scope.$watch(attrs.todoFocus, function(newVal) {
            if (newVal) {
                $timeout(function() {
                    elem[0].focus();
                }, delay, false);
            }
        });
    };
});
