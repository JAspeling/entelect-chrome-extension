import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HorizontalLoaderComponent } from './horizontal-loader.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HorizontalLoaderComponent
    ],
    exports: [
        HorizontalLoaderComponent
    ]
})
export class HorizontalLoaderModule {

}