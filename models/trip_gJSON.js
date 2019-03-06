const mongoose = require('mongoose');
const config = require('../config/database');

// trip_gJSON schema
const trip_gJSONSchema = mongoose.Schema({
    start_time: {
        type: String,
    },
    coords: {
        type: [
            {
                coordinates: [[Number]],
                speed: Number,
                dist: Number,
                index: Number,
            },
        ],
    },
    end_time: {
        type: String,
    },
});

const gJSONTrip_large = (module.exports = mongoose.model(
    'gJSONTrip_large',
    trip_gJSONSchema,
    'trips_large'
));

module.exports.getTripsByZoom = function(callback) {};
