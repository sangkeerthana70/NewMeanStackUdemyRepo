var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');//reference to the model that interacts with the database.

var runGeoQuery = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    
    if (isNaN(lng) || isNaN(lat)) {
        res
            .status(400)//bad request
            .json({
                "message": "If supplied in querystring, lng and lat must both be numbers"
            });
        return;
    } 
    
    //A geoJSON point
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    
    var geoOptions = {
        spherical: true,
        maxDistance: 2000,
        num: 5
    };
    
/*    Hotel
        .geoNear(point, geoOptions, function(err, results, stats) {
            if (err) throw err;
            console.log("Geo results", results);
            console.log("Geo stats", stats);
            res
                .status(200)
                .json(results);
        });
*/
    Hotel    
        .aggregate(
        [
            {
            '$geoNear': {
                'near': point,
                'spherical': true,
                'distanceField': 'dist',
                'maxDistance': 2000,//2000meters = 2km
                'num': 5
                }
            }
        ],
        function(err, results,  stats) {
            console.log("Geo results", results);
            console.log("Geo stats", stats);
            if (err) {
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);
            }
            else {
                res
                    .status(200)
                    .json(results);
            }
        });
};
module.exports.hotelsGetAll = function(req, res) {
 
    console.log('GET the hotels');
    console.log(req.query);
    
    var offset = 0;
    var count = 5;
    var maxCount = 10;
    
    if(req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);//to parse the returned string
        //into a number.
    }
    
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    
    if(isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message": "If supplied in querystring count and offset should be numbers"
            });
        return;
    }
    
    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message": "Count limit of " + maxCount + " exceeded"
            });
        return;
    }
    
    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {
            if (err) {
                console.log("Error finding hotels");
                res
                    .status(500)
                    .json(err);
            }
            else {
                console.log("Found hotels", hotels.length);
                res
                    .json(hotels);
            }
        });

};  

module.exports.hotelsGetOne = function(req, res) {
    var id = req.params.hotelId;
    console.log("Get hotelID", id);
    
    Hotel 
        .findById(id)
        .exec(function(err, doc) {  
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }
            else if(!doc) {
                console.log("HotelId not found in database", id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found" + id
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });

};       

module.exports.hotelsAddOne = function(req, res){
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;
  
    console.log("POST new hotel");
    
    if (req.body && req.body.name && req.body.stars) {
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        //console.log(newHotel);//the body-parser middleware will parse out all the data from the posted form to the req.body.
        collection.insertOne(newHotel, function(err,response){
                console.log(response);
                console.log(response.ops);
                res
                    .status(201)
                    .json(response.ops);
            });
        
     }
    else {
        console.log("Data missing from the body");
        res
            .status(400)
            .json({message: "Required data missing from body"});
    }
};
    
            
            