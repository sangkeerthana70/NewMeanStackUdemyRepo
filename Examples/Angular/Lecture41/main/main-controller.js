/*global  angular*/
angular.module('myApp').controller('MainController', MainController);

function MainController(FilmFactory) {
    var vm = this;
    
    FilmFactory.getAllFilms().then(function(response) {
        vm.films = response;
    });
    
    vm.name = 'Anuradha';
    
    vm.date1 = '12 February 2016';
    vm.date2 = '11 March 2016';
    vm.date3 = '03 January 2015';
    vm.date4 = '25 April 2014';

}
