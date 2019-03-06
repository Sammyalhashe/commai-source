const mongoose = require('mongoose');
const config = require('../config/database');

const trip_gJSONSchema = require('./tripSchema');

const TripSmall = (module.exports = mongoose.model(
    'Trip',
    trip_gJSONSchema,
    'trips_small'
));

module.exports.getAllTrips = function(callback) {
    TripSmall.find(callback);
};

module.exports.getTrips = function(zoom, callback) {
    TripSmall.find(callback);
};
