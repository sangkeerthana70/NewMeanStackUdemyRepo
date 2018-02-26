var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//Get all reviews for a hotel
module.exports.reviewsGetAll = function(req,res) {
      var id = req.params.hotelId;
      console.log("Get reviews for hotelID", id);
    
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
                    response.message = [];
                }
            }
                console.log(response.status);
              res
                .status(response.status)
                .json(response.message);
        });
};

//Get single review for a hotel
module.exports.reviewsGetOne = function(req,res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get reviewID " + reviewId + " for hotelId " + hotelId);
    
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

//add one review
//adding a sub document(review)by going through the parent document and resaving the document

var _addReview = function(req, res, hotel) {
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });
    
    hotel.save(function(err, hotelUpdated) {//hotel.save is a mongoose method, hotelUpdated is the new hotel that is created with the new review that is returned from mongoDB
        if(err) {
            res
                .status(500)
                .json(err);
        } 
        else {
            res
                .status(201)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
        }
    });
};

module.exports.reviewsAddOne = function(req,res) {
    console.log('POST review to hotelId', hotelId);
    var hotelId = req.params.hotelId;
    console.log("Get hotelId", hotelId);    
    
    Hotel
        .findById(hotelId)
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
                console.log("Hotel id not found in database", hotelId);
                response.status = 404;
                response.message = {
                  "message" : "Hotel ID not found " + hotelId
                };
            } 
            if (doc) {
                _addReview(req, res, doc);
            }
            else {
                 res
                .status(response.status)
                .json(response.message);
            }
        });
};

module.exports.reviewsUpdateOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", hotelId);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + hotelId
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};


module.exports.reviewsDeleteOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!hotel) {
        console.log("Hotel id not found in database", hotelId);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + hotelId
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        hotel.reviews.id(reviewId).remove();
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

    
};
        