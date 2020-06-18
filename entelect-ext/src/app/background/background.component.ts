import { Component } from '@angular/core';

import { ChromeUtils } from '../core/chrome-utils';
import { DataMessage, MessageType, Messages } from '../core/message';

@Component({
    selector: 'app-background',
    template: ''
})
export class BackgroundComponent {
    chrome = new ChromeUtils();

    constructor() {
        this.onInstalled();
        this.addListeners();
    }

    private addListeners(): void {
        chrome.contextMenus.onClicked.addListener((data) => this.addToExclusions(data));

        chrome.runtime.onMessage.addListener((message: DataMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) =>
            this.messageReceived(message, sender, sendResponse));
    }
    private messageReceived(message: DataMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void): void {
        if (message.type === MessageType.Background) {
            switch (message.message) {
                case Messages.Background.OpenOptions: this.openOptions();
            }
        }
    }

    private onInstalled(): void {
        chrome.runtime.onInstalled.addListener(function () {
            chrome.contextMenus.create({
                "id": "addToExclusions",
                "title": "Add to exclusion",
                "contexts": ["selection"]
            });
        });
    }

    private async addToExclusions(context: chrome.contextMenus.OnClickData): Promise<void> {
        if (!context.selectionText) return;
        const selected = context.selectionText.trim();

        const values: string[] = await this.chrome.getStorage('notificationExclusions', []);

        if (values.find(val => val.toLowerCase() === selected.toLowerCase())) {
            return this.chrome.sendMessage(new DataMessage(MessageType.Content_Script, 'warning_notification', `${selected} already in the exclusion list.`));
        }
        values.push(selected);
        console.log(values);

        try {
            await this.chrome.setStorage('notificationExclusions', values);
            return this.chrome.sendMessage(new DataMessage(MessageType.Content_Script, 'success_notification', `'${selected}' added successfully.`));
        } catch (error) {
            return this.chrome.sendMessage(new DataMessage(MessageType.Content_Script, 'error_notification', `Failed to add '${selected}'.`));
        }
    }

    private openOptions(): void {
        this.chrome.openOptions();
    }

}
