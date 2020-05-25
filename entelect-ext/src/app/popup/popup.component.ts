import { Component, OnInit } from '@angular/core';

import { ChromeUtils } from '../core/chrome-utils';
import { DataMessage, MessageType } from '../core/message';
import { Links, Link } from '../core/models/link';
import { LinksService } from '../core/services/links.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../core/services/loader-service';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html'
})
export class PopupComponent implements OnInit {
    public canClearNotifications: boolean = false;
    public nothingAvailable: boolean = false;
    public loadingMessage: string;

    public links$: Observable<Links>;
    public links: Links = [];

    private chrome: ChromeUtils = new ChromeUtils();

    constructor(private readonly linksService: LinksService,
        private readonly loader: LoaderService) {
        this.subscribeToLoader();
    }


    async ngOnInit(): Promise<void> {
        this.chrome.getHost().then(host => {
            this.canClearNotifications = host?.toLowerCase().includes('employee.entelect.co.za');

            setTimeout(() => {
                this.getLinks();
            });
        });
    }

    private getLinks() {
        this.loader.queue('Retrieving links');
        this.linksService.getLinks()
            .pipe(finalize(() => {
                this.nothingAvailable = !this.canClearNotifications && this.links?.length === 0;
                this.loader.dequeue('Retrieving links');
            }))
            .subscribe({
                next: (links: Links) => {
                    this.links = links;
                },
                error: (err) => {
                    console.error('Failed to retrieve links');
                }
            });
    }

    private subscribeToLoader() {
        this.loader.loading$.subscribe(state => {
            this.loadingMessage = state.loading ? state.message : null;
        })
    }

    public clearNotifications(): void {
        if (this.canClearNotifications) {
            this.chrome.sendMessage(new DataMessage(MessageType.Content_Script, 'clear_notifications'));
            window.close();
        }
    }

    public goToOptions(): void {
        this.chrome.openOptions();
    }

    public linkClicked(link: Link): void {
        window.open(link.url, '_blank');
    }
}
