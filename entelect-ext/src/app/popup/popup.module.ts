import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LinksService } from '../core/services/links.service';
import { PopupComponent } from './popup.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [
        PopupComponent
    ],
    exports: [
        PopupComponent
    ],
    providers: [
        LinksService
    ]
})
export class PopupModule {


}