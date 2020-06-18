import { Component, OnInit } from '@angular/core';

import { LoaderService, LoaderState } from '../services/loader-service';

@Component({
    selector: 'app-horizontal-loader',
    templateUrl: './horizontal-loader.component.html'
})
export class HorizontalLoaderComponent implements OnInit {
    public isLoading = false;

    constructor(private readonly loaderService: LoaderService) { 
        loaderService.loading$.subscribe((state: LoaderState) => { 
            this.isLoading = state.loading;
        })
    }
    ngOnInit(): void {
    }
}
