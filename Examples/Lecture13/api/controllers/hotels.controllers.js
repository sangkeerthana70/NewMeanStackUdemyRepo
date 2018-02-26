var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    console.log("Get the hotels");
        res
            .status(200)
            .json( hotelData );
};

module.exports.hotelsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;//req.params is an object and the url parameter name can be accessed inside it
    //by giving it a name hotelId that we give. We r using the URL parameter as the location INDEX.
    var thisHotel = hotelData[hotelId];
    console.log("Get hotelID", hotelId);
        res
            .status(200)
            .json( thisHotel );//changing the res.send to a individual hotel instead of
            //sending the whole hotelData as json object as we did before.
};            
            
            