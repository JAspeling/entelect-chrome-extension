import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { OptionsModule } from './options/options.module';
import { PopupComponent } from './popup/popup.component';

@NgModule({
    declarations: [
        AppComponent,
        BackgroundComponent,
        PopupComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // required animations module
        AppRoutingModule,
        OptionsModule,
        ToastrModule.forRoot()
    ],
    providers: [ToastrService],
    bootstrap: [AppComponent]
})
export class AppModule { }
