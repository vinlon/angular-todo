/*global angular */

/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
todo.directive('todoEscape', function() {
    'use strict';

    var ESCAPE_KEY = 27;

    //按ESC退出编辑
    return function(scope, elem, attrs) {
        elem.bind('keydown', function(event) {
            if (event.keyCode === ESCAPE_KEY) {
                scope.$apply(attrs.todoEscape);
            }
        });

        scope.$on('$destroy', function() {
            elem.unbind('keydown');
        });
    };
});
