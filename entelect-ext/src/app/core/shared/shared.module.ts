import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HorizontalLoaderModule } from '../horizontal-loader/horizontal-loader-module';

@NgModule({
    imports: [
        CommonModule,
        HorizontalLoaderModule
    ],
    exports: [
        HorizontalLoaderModule
    ]
})
export class SharedModule {

}