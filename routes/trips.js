const express = require('express');
const router = express.Router();
const TripLarge = require('../models/trip');
const TripMed = require('../models/trip_med');
const TripSmall = require('../models/trip_small');
//const L = require('leaflet');
// -----------------------------------------------------
// helper functions

/*
 * Decided not to go this route for server-side data parsing
 * It made things difficult when dealing with geoJSON layers.
 * I would have had to make another parse through the data anyways.
 */
/*

function newGeoJSON(linestring, speed) {
    const mapping = {
        high: '#ff7800',
        med_high: '#e47750',
        medium: '#fad022',
        med_low: '#f1b517',
        low: '#7adea3',
    };
    let color;
    if (speed < 5) {
        color = mapping.low;
    } else if (speed >= 5 && speed < 10) {
        color = mapping.med_low;
    } else if (speed >= 10 && speed < 15) {
        color = mapping.med_high;
    } else {
        color = mapping.high;
    }
    return {
        id: 'geoJSON',
        name: 'Geo JSON Polygon',
        enabled: true,
        layer: {
            geoJSON: {
                type: 'LineString',
                coordinates: linestring,
            },
            style: { style: () => ({ color: `${color}` }) },
        },
    };
}

function addLayer(coord) {
    const newLineString = [];
    newLineString[0] = coord.coordinates[0];
    newLineString[1] = coord.coordinates[1];
    return newGeoJSON(newLineString, coord.speed).layer;
}
function parseData(trips) {
    let layers = [];
    for (const trip of trips) {
        for (const coord of trip.coords) {
            // line that are zero are just useless clutter
            if (coord.speed !== 0) {
                layers.push(addLayer(coord));
            }
        }
    }
    return layers;
}
*/
// -----------------------------------------------------
// Requests database for larger zoom (DEFAULT)
router.get('/trips/large', (req, res, next) => {
    //res.send('trips');
    TripLarge.getAllTrips((err, trips) => {
        if (err) {
            console.json({ success: false, trips: [] });
        } else {
            res.json({ success: true, trips: trips });
            //res.json({ success: true, trips: parseData(trips)});
        }
    });
});

// IGNORE THIS
router.get('/trips/large/:zoom', (req, res, next) => {
    let geoJSON = {};
    let multPoints;
    switch (req.params.zoom) {
        case 'med':
            multPoints = 3;
            break;
    }
    TripLarge.getTrips(multPoints, (err, trips) => {
        res.json(trips);
    });
});

// -----------------------------------------------------
/*
 * Requests database for medium sized zooms
 */
router.get('/trips/med', (req, res, next) => {
    TripMed.getAllTrips((err, trips) => {
        if (err) {
            console.json({ success: false, trips: [] });
        } else {
            res.json({ success: true, trips: trips });
        }
    });
});

// IGNORE THIS
router.get('/trips/med/:zoom', (req, res, next) => {
    let geoJSON = {};
    let multPoints;
    switch (req.params.zoom) {
        case 'med':
            multPoints = 3;
            break;
    }
    TripMed.getTrips(multPoints, (err, trips) => {
        res.json(trips);
    });
});

// -----------------------------------------------------
/*
 * Gets the database for lower zooms
 */
router.get('/trips/small', (req, res, next) => {
    //res.send('trips');
    TripSmall.getAllTrips((err, trips) => {
        if (err) {
            console.json({ success: false, trips: [] });
        } else {
            res.json({ success: true, trips: trips });
        }
    });
});

// IGNORE THIS
router.get('/trips/small/:zoom', (req, res, next) => {
    let geoJSON = {};
    let multPoints;
    switch (req.params.zoom) {
        case 'med':
            multPoints = 3;
            break;
    }
    TripSmall.getTrips(multPoints, (err, trips) => {
        res.json(trips);
    });
});
module.exports = router;
