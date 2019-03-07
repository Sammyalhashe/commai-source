import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { MapResolver } from './map/map.resolver.service';

/*
 * Application only routes to one component
 */
const routes: Routes = [
    {
        path: 'home',
        component: MapComponent,
        resolve: {
            trips: MapResolver,
        },
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
