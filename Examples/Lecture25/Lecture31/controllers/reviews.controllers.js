var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//Get all reviews for a hotel
module.exports.reviewsGetAll = function(req,res) {
      var id = req.params.hotelId;
      //console.log("Get reviews for hotelID", id);
        console.log("I am here");
    Hotel 
        .findById(id)
        .select('reviews')
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : []
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } 
            else if(!doc) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                  "message" : "Hotel ID not found " + id
                };
            } else {
               //response.message = doc.reviews ? doc.reviews : [];
                if (doc.reviews) {
                    response.message = doc.reviews;
                }
                else {
                    response.reviews = [];
                }
            }
              res
                .status(response.status)
                .json(response.message);
        });
};

//Get single review for a hotel
module.exports.reviewsGetOne = function(req,res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    //console.log("Get reviewID " + reviewId + " for hotelId " + hotelId);
    console.log("I am here");
    
    Hotel 
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
        var response = {
            status: 200,
            message: {}
        };
        if(err)  {
            console.log("Error finding hotel");
            response.status = 500;
            response.message = err;
        }
        else if(!hotel) {
            console.log("Hotel id not found in database", hotelId);
            response.status = 404;
            response.message = {
              "message" : "Hotel ID not found " + hotelId
            };
        }
        else {
            //Get the review
            response.message = hotel.reviews.id(reviewId);
            // If the review doesn't exist Mongoose returns null
            if (!response.message) {
              response.status = 404;
              response.message = {
                "message" : "Review ID not found " + reviewId
              };
            }
        }
        res
            .status(response.status)
            .json(response.message);
    });

};
 

