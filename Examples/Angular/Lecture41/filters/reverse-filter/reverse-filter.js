/*global  angular*/
angular.module('myApp').filter('reverse', reverse);//first is the name of the filter,second is the function that handles the filter. 

function reverse() {
    return function(string) {
        if (string) {
            return string.split('').reverse().join('');
        }
    };
}