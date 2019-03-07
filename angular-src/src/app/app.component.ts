import { Component, OnInit } from '@angular/core';
import { TripsService } from './Shared/getTrips.service';
import {
    Router,
    Event,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    // boolean to toggle the spinner
    loading: boolean;

    /*
     * Upon navigation, this component subsribes to any router events
     * and activates/deactivated the spinner when necessary
     */
    constructor(private router: Router, private trips: TripsService) {
        this.router.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationStart) {
                this.loading = true;
            }

            if (
                routerEvent instanceof NavigationEnd ||
                routerEvent instanceof NavigationCancel ||
                routerEvent instanceof NavigationError
            ) {
                this.loading = false;
            }
        });

        // aside from listening to router events, a mini store is set
        // up for any time the spinner should be toggled
        // Could have used an event emitter though
        this.trips.getSubject().subscribe(data => {
            this.loading = data.loading;
        });
    }

    ngOnInit(): void {}
}
