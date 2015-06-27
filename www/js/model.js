angular.module('myModel.model', [])
    .factory('model', function () {

        return {
            verificar_sesion: function (usuario, $http, callback) {                                              
                $http({
                    url: 'http://sms.obairlines.bo/MySportsApi/api/Login',
                    dataType: 'json',
                    method: 'POST',                    
                    data:'usuario1='+usuario.usuario+'&password='+usuario.contra,                    
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },                                                        
                }).success(function (response) {
                    
                    callback(response);

                }).error(function (response) {
                    callback(response);
                });


            },

            listas_partidos: function ($http, callback) {
                $http({
                    url: 'http://sms.obairlines.bo/MySportsApi/api/Fixture/2',
                    dataType: 'json',
                    method: 'GET',                    
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                }).success(function (response) {

                    callback(response);

                }).error(function (response) {
                    callback(response);
                });
            },
            get_partido: function (partidoID ,$http, callback) {
                $http({
                    url: 'http://sms.obairlines.bo/MySportsApi/api/Encuentro' + '/' + partidoID,
                    dataType: 'json',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                }).success(function (response) {

                    callback(response);

                }).error(function (response) {
                    callback(response);
                });
            },
            save_partido: function (parametros, $http, callback) {
                $http({
                    url: 'http://sms.obairlines.bo/MySportsApi/api/Encuentro',
                    dataType: 'json',
                    data: parametros,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                }).success(function (response) {

                    callback(response);

                }).error(function (response) {
                    callback(response);
                });
            },
            deletePartido: function (parametros, $http, callback) {
                $http({
                    method: 'POST',
                    url:  '',
                    data: 'encuentroID=' + parametros,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                    },
                }).success(function (response) {
                    callback(response);

                }).error(function (response) {
                    callback(response);
                });
            }
            
        }
    });