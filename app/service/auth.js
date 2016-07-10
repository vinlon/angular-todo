'use strict';

todo.factory('auth', ['$q', '$rootScope', '$cookies' ,'Base64',
    function ($q, $rootScope, $cookies, base64) {
        var service = {};

        //登录
        service.login = function (username, password) {
            var deferred = $q.defer();
            var response = {
                return_code : 200,
                return_msg : "success"
            };

            var login_success = username === 'test' && password === 'test' ;
            if(!login_success) {
                response.return_code = -1;
                response.message = '用户名或密码错误';
            }else{
                var authdata = base64.encode(username + ':' + password);

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: authdata
                    }
                };

                $cookies.put('globals', JSON.stringify($rootScope.globals));
            }

            deferred.resolve(response);
            return deferred.promise;
        };

        //注销
        service.logout = function () {
            var deferred = $q.defer();
            var response = {
                return_code : 200,
                return_msg : "success"
            };
            $rootScope.globals = {};
            $cookies.remove('globals');
            deferred.resolve(response);
            return deferred.promise;
        };

        return service;
    }]);
