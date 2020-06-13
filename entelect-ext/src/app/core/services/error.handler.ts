import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {

    }
    public handleError(error: any): void {

        const location = this.injector.get(LocationStrategy);
        const message = error.message ? error.message : error.toString();
        const url = location instanceof PathLocationStrategy ? location.path() : '';

        console.log(location, message, url, new Error().stack);

        throw error;
    }

}