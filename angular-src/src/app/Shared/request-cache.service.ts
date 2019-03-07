import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 30000;
@Injectable()
export class RequestCache {
    // cache
    cache = new Map();

    /*
     * Intercepts the request and checks if the data, keyed by the url
     * is already in the cache. If it is, it returns the stored response
     */
    get(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;

        // see if it is already in the cache
        const cached = this.cache.get(url);

        if (!cached) {
            return undefined;
        }

        /*
        if (this.cache.has('total')) {
            cached = this.cache.get('total');
        }
        */

        const isExpired = cached.lastRead < Date.now() - maxAge;
        const expired = isExpired ? 'expired ' : '';
        return cached.response;
    }

    /*
     * On the condition that the get method returns undefined, the
     * interceptor will download the data, then send it to this method.
     * The resulting response will then be stored in the cache.
     */
    put(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.url;
        const entry = { url, response, lastRead: Date.now() };
        this.cache.set(url, entry);

        // this is a comment
        /*
        if (this.cache.has('total')) {
            const temp = this.cache
                .get('total')
                .response.body.trips.concat(entry.response.body.trips);
            entry.response.body.trips = temp;
            this.cache.set('total', entry);
        } else {
            this.cache.set('total', entry);
        }
        */

        // delete any expired entries
        const expired = Date.now() - maxAge;
        this.cache.forEach(expiredEntry => {
            if (expiredEntry.lastRead < expired) {
                this.cache.delete(expiredEntry.url);
            }
        });
    }
}
