import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { OptionsComponent } from './options.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragDropModule,
        ToastrModule.forRoot(),
    ],
    declarations: [
        OptionsComponent
    ],
    exports: [
        OptionsComponent,
        DragDropModule
    ],
    providers: [
        ToastrService
    ]
})
export class OptionsModule {

}