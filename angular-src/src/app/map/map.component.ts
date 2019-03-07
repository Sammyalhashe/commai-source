import { Component, OnInit, HostListener } from '@angular/core';
import { TripsService } from '../Shared/getTrips.service';
import { ActivatedRoute } from '@angular/router';
import { IAllTrips } from '../Shared/interfaces';
import { Observable, Subscription } from 'rxjs';
import { latLng, tileLayer, geoJSON, Layer, Map } from 'leaflet';

/*
 * DONE: Find a way to only render the LineStrings that are visible
 * on the map and change the layers array when you move on the map
 * not vecessary: leaflet seems to do a good job at rendering when
 * necessary.
 */

/*
 * DONE: decide how you want your database, and thus how you handle your
 * caching
 */

/*
 * DONE: add legend for speed and colors
 */

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    opened = false;
    // stores all incoming data to be processed
    allTrips: IAllTrips;
    sub: Subscription;

    // store the current and previous zoom to decide which dataset to load
    zoom: number;
    prevZoom: number;

    // avg longitude/latitude -> where the map should first render
    avgLat: number;
    avgLng: number;

    // speeds and the color that represents them
    speeds = ['high', 'med_high', 'med_low', 'low'];
    colorMapping = {
        high: '#ff7800',
        med_high: '#e47750',
        medium: '#fad022',
        med_low: '#f1b517',
        low: '#7adea3',
    };
    speedMapping = {
        low: 'speed < 5 m/s',
        med_low: '5m/s &le; speed < 10m/s',
        med_high: '10m/s &le; speed < 15m/s',
        high: 'speed &ge; 15m/s',
    };

    // this holds all the leaflet layers to be rendered on the map
    layers: Layer[];

    /*
     * require teh ActivatedRoute and TripsService services
     */
    constructor(private route: ActivatedRoute, private trips: TripsService) {}

    /*
     * options for the leaflet map. Made it a getter as the latitude
     * longitude values may change
     */
    get options() {
        return {
            layers: [
                tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        maxZoom: 18,
                        attribution: '&copy; OpenStreetMap contributors',
                    }
                ),
            ],
            zoom: 12,
            center: latLng(this.avgLat, this.avgLng),
        };
    }

    /*
     * Subsribe to the prefetched data and start its processing
     */
    ngOnInit() {
        this.layers = [];
        this.sub = this.route.data.subscribe(data => {
            this.allTrips = data.trips;
        });
        this.sub.unsubscribe();
        [this.avgLng, this.avgLat] = this.calcAveragePoint();
        this.zoom = this.options.zoom;
        this.prevZoom = this.options.zoom;
    }

    // click listener for the sidenav toggle button
    toggleSidenav(): void {
        this.opened = !this.opened;
    }

    /*
     * Returns a new geoJSON layer to be added to the map.
     * Gives the LineString a different color depending on the
     * speed
     */
    newGeoJSON(linestring, speed) {
        let color;
        if (speed < 5) {
            color = this.colorMapping.low;
        } else if (speed >= 5 && speed < 10) {
            color = this.colorMapping.med_low;
        } else if (speed >= 10 && speed < 15) {
            color = this.colorMapping.med_high;
        } else {
            color = this.colorMapping.high;
        }
        return {
            id: 'geoJSON',
            name: 'Geo JSON Polygon',
            enabled: true,
            layer: geoJSON(
                {
                    type: 'LineString',
                    coordinates: linestring,
                } as any,
                { style: () => ({ color: `${color}` }) }
            ),
        };
    }

    /*
     * Add to the layers array
     */
    addLayer(coord): void {
        const newLineString = [];
        newLineString[0] = coord.coordinates[0];
        newLineString[1] = coord.coordinates[1];
        this.layers.push(this.newGeoJSON(newLineString, coord.speed).layer);
    }

    /* Loop over trips and filter out the samples when the cars aren't moving
     * as I thought it would de-clutter my map
     */
    loopTrips(): void {
        for (const trip of this.allTrips.trips) {
            for (const coord of trip.coords) {
                // line that are zero are just useless clutter
                if (coord.speed !== 0) {
                    this.addLayer(coord);
                }
            }
        }
    }

    /*
     * This function calculates the average longitude and latitude
     * to display as a center point on the map.
     * In addition, it also completes a first pass by adding data to
     * the layers array
     */
    calcAveragePoint(): [number, number] {
        let avgLat = 0;
        let avgLng = 0;
        let coordIndex = 0;
        for (const trip of this.allTrips.trips) {
            for (const coord of trip.coords) {
                // line that are zero are just useless clutter
                if (coord.speed !== 0) {
                    // may as well take care of adding the layers too
                    this.addLayer(coord);
                    avgLat += coord.coordinates[0][1] + coord.coordinates[1][1];
                    avgLng += coord.coordinates[0][0] + coord.coordinates[1][0];
                    coordIndex += 2; // adding two points at once
                }
            }
        }
        return [avgLng / coordIndex, avgLat / coordIndex];
    }

    zoomTracker(): void {}

    zoomStart(): void {
        // this.layers = [];
    }

    /*
     * Maps a zoom to a defined category
     */
    zoomMapper(zoom: number): string {
        if (zoom <= 12) {
            return 'large';
        } else if (zoom > 12 && zoom <= 14) {
            return 'med';
        } else {
            return 'small';
        }
    }

    /*
     * If necessary, it grabs new data
     */
    zoomEnd(): void {
        const prevLabel = this.zoomMapper(this.prevZoom);
        const Label = this.zoomMapper(this.zoom);
        if (prevLabel !== Label) {
            this.layers = [];
            this.trips.loading = true;
            this.sub = this.trips.getAllTrips(Label).subscribe(data => {
                this.allTrips = data;
                this.trips.loading = false;
                this.loopTrips();
                // apparently unecessary as angular http requests automatically ubsubscribe
                // this.sub.unsubscribe(); // I'm a bit iffy on doing this
            });
        }
        this.prevZoom = this.zoom;
    }

    onMapReady(map: Map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 0);
    }
}
