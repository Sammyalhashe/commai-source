import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsService } from './Shared/getTrips.service';
import { MapComponent } from './map/map.component';
import { MapResolver } from './map/map.resolver.service';
import { MaterialModule } from './material/material.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NavbarComponent } from './Navbar/navbar.component';
import { RequestCache } from './Shared/request-cache.service';
import { CachingInterceptor } from './Shared/caching.interceptor';

@NgModule({
    declarations: [AppComponent, MapComponent, NavbarComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
        LeafletModule.forRoot(),
    ],
    providers: [
        TripsService,
        MapResolver,
        RequestCache,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CachingInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
