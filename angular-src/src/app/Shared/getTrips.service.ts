import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAllTrips } from './interfaces';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TripsService {
    // url to talk to backend
    // http://localhost:3000/
    url = 'api/trips';

    /*
     * variable that turns on/off the spinner
     * The subject below is used to stream data to itself
     * in multiple places such as the AppComponent
     */
    private LOADING = false;
    private loadingSubject = new Subject<any>();

    // need the HttpClient service
    constructor(private http: HttpClient) {}

    /*
     * getter and setter for the loading variable.
     * In the setter, the Subject stream is updated as well
     */
    get loading(): boolean {
        return this.LOADING;
    }

    set loading(load: boolean) {
        this.LOADING = load;
        this.loadingSubject.next({ loading: load });
    }

    /*
     * Returns the subject to be used in multiple places
     */
    getSubject(): Observable<any> {
        return this.loadingSubject.asObservable();
    }

    /*
     * Queries the backend for the dataset based on the zoom
     */
    getAllTrips(size): Observable<IAllTrips> {
        const result = this.http.get(this.url + '/' + size) as Observable<
            IAllTrips
        >;
        return result;
    }
}
