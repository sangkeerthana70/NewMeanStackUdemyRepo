//here we create methods and return them to module.exports
var filename = "index.js"; 
var hello = function(name) {//this method accepts variables when called
    console.log("Hello " + name);
};

var intro = function() {
    console.log("I'm a node file called " + filename);//this private filename can be accessed in
    //the method when it is called.
};

//to expose the above two functions as methods we use module.exports.
module.exports = {
    hello: hello,
    intro: intro
};