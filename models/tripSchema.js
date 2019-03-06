const mongoose = require('mongoose');

// Trip schema

const trip_gJSONSchema = mongoose.Schema(
    {
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
    },
);
module.exports = trip_gJSONSchema;
