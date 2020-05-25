import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { share } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

export class LoaderState {
    constructor(public loading: boolean, public message: string) { }
}

@Injectable({ providedIn: 'root' })
export class LoaderService {
    loading$: Observable<LoaderState>;
    private observer: Observer<LoaderState>;
    private readonly loaderQueue: string[] = [];

    public separator: string = '|'

    get amendedMessage(): string {
        return this.loaderQueue.join(` ${this.separator} `);
    };

    constructor() {
        this.loading$ = new Observable<LoaderState>(x => this.observer = x).pipe(share());
    }

    public showLoader(message?: string): void {
        if (this.observer) {
            this.observer.next(new LoaderState(true, message));
        }
    }

    public hideLoader(): void {
        if (this.observer) {
            this.observer.next(new LoaderState(false, this.amendedMessage || ''));
        }
    }

    private update(isLoading: boolean, message: string): void {
        this.observer.next(new LoaderState(isLoading, message));
    }

    public queue(message: string): void {
        this.loaderQueue.push(message);
        this.showLoader(this.amendedMessage);
    }

    public dequeue(message: string): void {
        const index = this.loaderQueue.indexOf(message);

        if (index >= 0) {
            this.loaderQueue.splice(index, 1);
        }

        if (this.loaderQueue.length === 0) {
            this.hideLoader();
        } else {
            this.update(true, this.amendedMessage);
        }
    }
}
