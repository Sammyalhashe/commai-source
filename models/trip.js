const mongoose = require('mongoose');
const config = require('../config/database');

const trip_gJSONSchema = require('./tripSchema');

const TripLarge = (module.exports = mongoose.model(
    'Trip',
    trip_gJSONSchema,
    'trips_large'
));

const mapping = {
    high: TripLarge,
};

module.exports.getAllTrips = function(callback) {
    // TripLarge.find(callback, { limit: 1 });
    TripLarge.find(callback);
};

module.exports.getTrips = function(zoom, callback) {
    TripLarge.find(callback);
};
