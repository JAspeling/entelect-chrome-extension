import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private activatedRoute: ActivatedRoute, private route: Router) {

        // console.log('AppComponent ctor');

        // activatedRoute.queryParams.subscribe((params: Params) => {
        //     if (params['page']) {
        //         const hashedRoute = `/ext.html#/page=options`
        //         const route = `/${params['page']}`;
                
        //         console.log(`Routing to ${hashedRoute}`);
        //         // this.route.navigate([route]);
        //     }
        // })

    }
}
