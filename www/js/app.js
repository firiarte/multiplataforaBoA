// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('mySports', ['ionic', 'myModel.model']);



app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html'
    });

    $stateProvider.state('listaPartidos', {
        url: '/listaPartidos',
        templateUrl: 'templates/listaPartidos.html'
    });

    $stateProvider.state('editPartido', {
        url: '/editPartido/:encuentroID',
        templateUrl: 'templates/editPartido.html',
        controller: 'EditPartidoCtrl'
    });

    $urlRouterProvider.otherwise('/login');    
});




app.controller('LoginCtrl', function ($scope, $http, $state, model) {
   
    $scope.iniciar = function (user) {
        var array_us = user;
        model.verificar_sesion(array_us, $http, function (res) {
            console.log('respuesta', res);
            $scope.mensaje = res.data.mensaje;
            $state.go('listaPartidos');
        });
    };

});

app.controller('PartidoList', function ($scope, $http, $state, model) {

    model.listas_partidos($http, function (res) {
        console.log(res.encuentros);
        $scope.encuentros = res.encuentros;

    });      

    $scope.cargarNuevos = function () {
        
        model.listas_partidos($http, function (callback) {
            console.log(callback);
            $scope.encuentros = callback.encuentros;
        });
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.eliminarPartido = function (partidoID) {
        console.log(partidoID);        
        var parametros = 'encuentroID=' + partidoID;
        model.deletePartido('seguridad', 'Persona', 'eliminarPersona', parametros, $http, function (callback) {
            console.log(callback);

        });
        console.log('datos antes de eliminar', $scope.datos);
        for (var i = 0; i < $scope.datos.length; i++) {
            if ($scope.datos[i].id_persona === personaId) {
                console.log('datos a eliminar', $scope.datos[i])
                $scope.datos.splice(i, 1);
                return;
            }
        }
        console.log('datos despues de eliminar', $scope.datos);

    };

});


app.controller('EditPartidoCtrl', function ($scope, $state, model, $http) {

    console.log($state.params.encuentroID);

    var id = $state.params.encuentroID.replace(' class=', '');
    console.log(id);
    model.get_partido(id, $http, function (callback) {
        
        $scope.encuentros = callback;
    });

    console.log($scope.encuentros);

    $scope.save_partido = function () {
        //agregamos el campo id_persona en los parametros para que sepa que se debe modificar y no guardar
        var parametros = 'encuentroID=' + $scope.encuentros.encuentroID + '&equipoA=' + $scope.encuentros.equipoA + '&equipoB=' + $scope.encuentros.equipoB + '&cancha=' + $scope.encuentros.cancha;

        console.log(parametros);
        //modificacion el control back-end sabe si creara uno nuevo o modificara uno que se haya seleccionado.
        model.save_partido(parametros, $http, function (callback) {
            console.log(callback);                  
           
            $state.go('listaPartidos');
        });

    };



    //app.controller('MapaCtrl', function ($scope, $state, Store, $http) {

    //});


});



app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.cordova && window.cordova.InAppBrowser){
            window.open = window.cordova.InAppBrowser.open;
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});



