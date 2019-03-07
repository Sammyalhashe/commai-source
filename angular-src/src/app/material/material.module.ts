import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule
    ],
    exports: [
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule
    ],
    declarations: [],
})
export class MaterialModule {}
