import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private activatedRoute: ActivatedRoute, private route: Router) {

        // activatedRoute.queryParams.subscribe((params: Params) => {
        //     if (params['page']) {
        //         const route = `/${params['page']}`;
        //         this.route.navigate([route]);
        //     }
        // })

    }
}
