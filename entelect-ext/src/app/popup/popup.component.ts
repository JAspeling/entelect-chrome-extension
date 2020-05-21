import { Component, OnInit } from '@angular/core';

import { ChromeUtils } from '../core/chrome-utils';
import { DataMessage } from '../core/message';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
    canClearNotifications: boolean = false;
    public chrome: ChromeUtils = new ChromeUtils();

    constructor() { }

    async ngOnInit(): Promise<void> {
        console.log('Async ngOnInit');

        const host = await this.chrome.getHost();

        this.canClearNotifications = host?.toLowerCase().includes('employee.entelect.co.za');

        console.log('Can clear', this.canClearNotifications);
    }

    public clearNotifications(): void {
        if (this.canClearNotifications) {
            console.log('Clearing Notifications');
            this.chrome.sendMessage(new DataMessage('clear_notifications'));
        }
    }

    public goToOptions(): void {
        this.chrome.openOptions();
    }

}
