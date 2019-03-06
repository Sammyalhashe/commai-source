const mongoose = require('mongoose');
const config = require('../config/database');

const trip_gJSONSchema = require('./tripSchema');

const TripMed = (module.exports = mongoose.model(
    'Trip',
    trip_gJSONSchema,
    'trips_med'
));

module.exports.getAllTrips = function(callback) {
    TripMed.find(callback);
};

module.exports.getTrips = function(zoom, callback) {
    TripMed.find(callback);
};
