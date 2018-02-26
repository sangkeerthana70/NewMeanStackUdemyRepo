var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://anuradha78-homework1-5577789';
console.log(process.env.ip);
var _connection = null;

var open = function(){
   MongoClient.connect(dburl, function(err, client){
       if(err) {
           console.log("DB connection failed");
           return;
       }
        // set _connection
       _connection = client.db("meanhotel");
       console.log("DB connection open", client);
   });
};

var get = function() {
   return _connection;
};

module.exports = {
   open : open,
   get : get
};



