import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopupComponent } from './popup/popup.component';
import { OptionsComponent } from './options/options.component';
import { BackgroundComponent } from './background/background.component';

const routes: Routes = [
    { path: 'popup', component: PopupComponent },
    { path: 'options', component: OptionsComponent },
    { path: 'background', component: BackgroundComponent },
    { path: '**', component: PopupComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
