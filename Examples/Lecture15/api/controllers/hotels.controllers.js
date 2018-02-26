var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    console.log("Get the hotels");
    console.log(req.query);//query string parameters.
    
    var offset = 0;
    var count = 5;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);//to parse the returned string
        //into a number.
    }
    
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    var returnData = hotelData.slice(offset, offset+count);
    
    res
            .status(200)
            .json(returnData);    
};

   
module.exports.hotelsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId];
    console.log("Get hotelID", hotelId);
        res
            .status(200)
            .json( thisHotel );//changing the res.send to a individual hotel instead of
            //sending the whole hotelData as json object as we did before.
};       

module.exports.hotelsAddOne = function(req, res){
    console.log("POST new hotel");
    console.log(req.body);//the body-parser middleware will parse out all the data from the posted form to the req.body.
    res
            .status(200)
            .json(req.body);
};
            
            