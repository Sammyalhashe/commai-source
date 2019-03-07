/*
 * This file containes interfaces used as common types
 * through the application. Mainly useful for typing retrived data
 */
export interface Iframe {
    dist1: number;
    dist2: number;
    index: number;
    /*lat: number;*/
    /*lng: number;*/
    coordinates: Array<Array<number>>;
    speed: number;
}

export interface ITrip {
    start_time: string;
    end_time: string;
    coords: Array<Iframe>;
    _id: string;
}

export interface IAllTrips {
    success: boolean;
    trips: Array<ITrip>;
}
