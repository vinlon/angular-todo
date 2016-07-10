/*global angular */

todo.factory('todoStorage', function($q) {
    'use strict';

    var STORAGE_ID = 'todos-angularjs';

    var store = {
        todos: JSON.parse(localStorage.getItem(STORAGE_ID) || '[]'),

        _saveToLocalStorage: function(todos) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
        },

        clearCompleted: function() {
            var deferred = $q.defer();

            var completeTodos = [];
            var incompleteTodos = [];
            store.todos.forEach(function(todo) {
                if (todo.completed) {
                    completeTodos.push(todo);
                } else {
                    incompleteTodos.push(todo);
                }
            });

            angular.copy(incompleteTodos, store.todos);

            store._saveToLocalStorage(store.todos);
            deferred.resolve(store.todos);

            return deferred.promise;
        },

        delete: function(todo) {
            var deferred = $q.defer();

            store.todos.splice(store.todos.indexOf(todo), 1);

            store._saveToLocalStorage(store.todos);
            deferred.resolve(store.todos);

            return deferred.promise;
        },

        insert: function(todo) {
            var deferred = $q.defer();

            store.todos.push(todo);

            store._saveToLocalStorage(store.todos);
            deferred.resolve(store.todos);

            return deferred.promise;
        },

        put: function(todo, index) {
            var deferred = $q.defer();

            store.todos[index] = todo;

            store._saveToLocalStorage(store.todos);
            deferred.resolve(store.todos);

            return deferred.promise;
        }
    };

    return store;
});
