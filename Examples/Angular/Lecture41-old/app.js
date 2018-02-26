/*global  angular*/
angular.module('myApp', ['ngRoute']).config(config);

function config ($routeProvider) {//$routeProvider helps to set up routes for the application
    $routeProvider.when('/',{
        templateUrl: 'templates/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
    }).when('/film/:id', {
        templateUrl: 'templates/film.html',
        controller: 'FilmController',
        controllerAs: 'vm'
    })
    .otherwise({
        redirectTo:'/'
    });
}