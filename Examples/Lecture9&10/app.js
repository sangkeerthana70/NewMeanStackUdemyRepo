var express = require('express');//require express
var app = express();//initialize express.
var path = require('path');

app.set('port', process.env.PORT); //sets port property for entire app

app.use(express.static(path.join(__dirname, 'public')));//static folder
//app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/json', function(req,res) {
    console.log("Get the json");
       res.status(200)
       res.json( {"jsonData": true} );
});

app.get('/file', function(req,res) {
    console.log("Get the file");
       res
        .status(200)
        .sendFile(path.join(__dirname, 'app.js'));//this route will return the app.js file to the browser.
});

var server = app.listen(app.get('port'), function() {//app.get retrieves the port variable
    var port = server.address().port;//to extract the port number from the object.
    console.log("Magic happens on Port ..."+ port);
});


