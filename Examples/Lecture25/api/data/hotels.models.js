var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now,
    }
});

var roomSchema = new mongoose.Schema({
    type: String,
    number: Number,
    description: String,
    photos: [String],
    price: Number
});

var hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        "default": 0
    },    
    services: [String],
    description: String,
    photos: [String],
    currency: String,
    reviews: [reviewSchema],
    rooms: [roomSchema],
    location: {
        address: String,
        //Always store coordinates longitude(E/W) and latitude (N/S) order
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
});
//First parameter is the name of the model Hotel, second is the schema name, and
//third is the collection name which the model will create automatically if omitted.
mongoose.model('Hotel', hotelSchema,'hotels');



