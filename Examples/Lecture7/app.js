var express = require('express');//require express
var app = express();//initialize express.

app.set('port', process.env.PORT); //sets port property for entire app

var server = app.listen(app.get('port'), function() {//app.get retrieves the port variable
    var port = server.address().port;//to extract the port number from the object.
    console.log("Magic happens on Port ..."+ port);
});
//console.log("Me first");//to make sure the app.listen is a 
//asynchronous call.




