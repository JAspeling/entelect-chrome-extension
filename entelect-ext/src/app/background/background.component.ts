import { Component } from '@angular/core';

import { DataMessage } from '../core/message';
import { ChromeUtils } from '../core/chrome-utils';

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
    }

    private onInstalled(): void {        
        chrome.runtime.onInstalled.addListener(function () {

            chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
                chrome.declarativeContent.onPageChanged.addRules([{
                    conditions: [
                        new chrome.declarativeContent.PageStateMatcher({
                            pageUrl: { hostEquals: 'employee.entelect.co.za' },
                        })
                    ],
                    actions: [new chrome.declarativeContent.ShowPageAction()]
                }]);
            });

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
            return this.chrome.sendMessage(new DataMessage('warning_notification', `${selected} already in the exclusion list.`));
        }
        values.push(selected);
        console.log(values);

        try {
            await this.chrome.setStorage('notificationExclusions', values);
            return this.chrome.sendMessage(new DataMessage('success_notification', `'${selected}' added successfully.`));
        } catch (error) {
            return this.chrome.sendMessage(new DataMessage('error_notification', `Failed to add '${selected}'.`));
        }
    }

}
