//This is an example of a Asynchronous code.
/*
var fs = require('fs');
console.log("Going to get a file ");
fs.readFile('readFileSync.js', function(err, file) {
    console.log("Got the file");
});

console.log("App continues");*/

// we can also have a named callback instead of just the call back
//to do some processing
var fs = require('fs');

var onFileLoad = function(err, file) {
    console.log("Got the file");
};
console.log("Going to get a file ");
fs.readFile('readFileSync.js', onFileLoad);


console.log("App continues");

