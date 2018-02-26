var express = require("express");
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');

router
    .route('/hotels')//chain the router to the route in app.js
    .get(ctrlHotels.hotelsGetAll);

module.exports = router;