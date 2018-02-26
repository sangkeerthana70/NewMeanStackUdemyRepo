var express = require("express");
var router = express.Router();

router
    .route('/json')//chain the router to the route
    .get(function(req,res) {
        console.log("Get the json");
        res
            .status(200)
            .json( {"jsonData": true} );
    })
    
    .post(function(req,res) {
        console.log("POST the json route");
        res
            .status(200)
            .json( {"jsonData": "POST received"} );
    });
    
module.exports = router;