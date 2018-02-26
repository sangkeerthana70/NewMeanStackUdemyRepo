
var express = require('express');//require express
var app = express();//initialize express.
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');//get the routes from the /api/routes folder under Lecture12

app.set('port', process.env.PORT); //sets port property for entire app

app.use(express.static(path.join(__dirname, 'public')));//static folder
//app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended : false}));//urlencoded is the method used for sending html posted forms.

app.use('/api', routes);

var server = app.listen(app.get('port'), function() {//app.get retrieves the port variable
    var port = server.address().port;//to extract the port number from the object.
    console.log("Magic happens on Port ..."+ port);
});


