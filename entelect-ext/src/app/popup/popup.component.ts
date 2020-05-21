import { Component, OnInit } from '@angular/core';

import { ChromeUtils } from '../core/chrome-utils';
import { DataMessage, MessageType } from '../core/message';
import { Links, Link } from '../core/models/link';
import { LinksService } from '../core/services/links.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html'
})
export class PopupComponent implements OnInit {
    public canClearNotifications: boolean = false;
    public links$: Observable<Links>;

    private chrome: ChromeUtils = new ChromeUtils();

    constructor(private readonly linksService: LinksService) {
        this.links$ = this.linksService.getLinks();
    }

    async ngOnInit(): Promise<void> {
        const host = await this.chrome.getHost();

        this.canClearNotifications = host?.toLowerCase().includes('employee.entelect.co.za');
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
