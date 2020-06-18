import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { OptionsModule } from './options/options.module';
import { PopupModule } from './popup/popup.module';
import { GlobalErrorHandler } from './core/services/error.handler';

@NgModule({
    declarations: [
        AppComponent,
        BackgroundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // required animations module
        AppRoutingModule,
        OptionsModule,
        PopupModule,
        ToastrModule.forRoot()
    ],
    providers: [ToastrService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
