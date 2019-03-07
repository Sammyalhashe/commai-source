// Angular Imports
import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

// RxJS Imports
import { Observable } from 'rxjs';
import { TripsService } from '../Shared/getTrips.service';
import { IAllTrips } from '../Shared/interfaces';

/*
 * prefetches data upon routing to the map component.
 * Starts at the large zoom data as that is what the map
 * component initially renders/
 */
@Injectable()
export class MapResolver implements Resolve<Observable<IAllTrips>> {
    constructor(private trips: TripsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.trips.getAllTrips('large');
    }
}
