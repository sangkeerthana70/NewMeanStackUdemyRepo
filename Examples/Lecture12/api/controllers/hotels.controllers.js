var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    console.log("Get the hotels");
        res
            .status(200)
            .json( hotelData );
};