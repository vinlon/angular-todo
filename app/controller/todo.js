/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todo.controller('TodoCtrl', ['$scope', '$state', '$stateParams', '$filter', 'store',
    function TodoCtrl($scope, $state, $stateParams, $filter, store) {
        'use strict';

        //根据状态显示不同的内容
        var status = $stateParams.status || '';
        var statusFitler = {};
        switch (status) {
            case "completed":
                $scope.showClear = true;
                statusFitler = { completed: true };
                break;
            case "active":
                statusFitler = { completed: false };
                break;
            default:
                statusFitler = {};
                break;
        }

        //初始化待办项列表
        //检测到待办项长度变化时，重新加载数据
        $scope.$watch(function() {
            return store.todos.length;
        }, function() {
            $scope.todos = $filter('filter')(store.todos, statusFitler);
        }, true);

        //添加待办项
        $scope.addTodo = function() {
            if (!$scope.newTodo) {
                return;
            }
            var newTodo = {
                'title': $scope.newTodo,
                'completed': false
            };
            store.insert(newTodo).then(function() {
                $scope.newTodo = '';
            });
        };

        //编辑待办项
        $scope.editTodo = function(todo) {
            $scope.editedTodo = todo;
            //保存原始的状态
            $scope.originalTodo = angular.extend({}, todo);
        };

        //保存待办项, (注： Submit同时也会触发blur事件)
        $scope.saveEdits = function() {
            if (!$scope.editedTodo) {
                return;
            }
            store.put($scope.editedTodo, store.todos.indexOf(todo)).then(
                function success() {
                    $scope.editedTodo = null;
                },
                function error() {});
        };

        //按ESC撤销编辑
        $scope.revertEdits = function(todo) {
            //恢复原状
            $scope.todos[$scope.todos.indexOf(todo)] = $scope.originalTodo;
            $scope.editedTodo = null;
            $scope.originalTodo = null;
        };

        //切换待办项状态
        $scope.toggleCompleted = function(todo) {
            store.put(todo, store.todos.indexOf(todo)).then(
                function success() {},
                function error() {
                    //rollback
                    todo.completed = !todo.completed;
                });
        };

        //批量标记待办项状态
        $scope.markAll = function(completed) {
            $scope.todos.forEach(function(todo) {
                if (todo.completed != completed) {
                    todo.completed = completed;
                    $scope.toggleCompleted(todo);
                }
            });
        };

        //删除待办项
        $scope.removeTodo = function(todo) {
            store.delete(todo);
        };

        //清除已完成的待办项
        $scope.clearCompletedTodos = function() {
            $scope.todos.forEach(function(todo) {
                $scope.removeTodo(todo);
            });
        };
    }
]);
