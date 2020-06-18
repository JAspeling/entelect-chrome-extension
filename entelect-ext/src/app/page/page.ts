
import { DataMessage, MessageType, Messages } from '../core/message';
import { ChromeUtils } from '../core/chrome-utils';
import { containsOneOf } from '../core/shared/utils';

declare const Swal: any;

/* 
    NOTE:

    This page is a pure javascript package, and can't be treated as an Angular component. 
    
    Because it is a Content_Script, it is treated in isolation from the extension, and can 
    only communicate with other components of the extension using chrome messaging.

    If you require any third-party libraries, they will have to be added as vendor packages
    alongside the assets, and also added as content_scripts. 
    Note: Content_scripts are injected in the same order they appear in the content_scripts 
    array, so the dependencies of a script  need to be imported _before_ the script consuming 
    them.

    This is true for CSS as well, any css that the script is dependent on, will have to be added
    to the css array in the content_scripts array.

*/

export class PageService {
    private exclusions: string[] = [];
    private chrome = new ChromeUtils();

    constructor() {
        // console.log('Page.js script loaded.');
        this.addListeners();
    }

    private addListeners() {
        chrome.runtime.onMessage.addListener((message: DataMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
            if (message.type === MessageType.Content_Script) {
                switch (message.message) {
                    case Messages.ContentScript.ClearNotification: this.clearNotifications(); break;
                    case Messages.ContentScript.SuccessNotification: toastr.success(message.data); break;
                    case Messages.ContentScript.ErrorNotification: toastr.error(message.data); break;
                    case Messages.ContentScript.WarningNotification: toastr.warning(message.data); break;
                }
            }
        });
    }

    private async clearNotifications() {
        const exclusions = await this.chrome.getStorage<string[]>('notificationExclusions', []);

        console.log(exclusions);
        const notifications = this.getNotifications();
        const filtered = this.filterNotifications(notifications, exclusions);

        if (filtered.length === 0) {
            toastr.info('There are no notifications to be cleared.');
            return;
        } 

        const top = exclusions.slice(3);

        const exclusionText = exclusions.length > 3
            ? `${exclusions.slice(0, 3).join(', ')} and a <a id="viewMore">few others</a>`
            : `${exclusions.join(', ')}`

        const message: string = notifications.length === filtered.length
            ? 'This will clear all the kudos'
            : `This will clear <strong>${filtered.length}</strong> out of <strong>${notifications.length}</strong> kudos, excluding: ${exclusionText}.`

        Swal.fire({
            title: 'Are you sure?',
            html: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result: any) => {
            if (result.value) {
                const closed = this.clickCloseOnNotification(filtered);
                toastr.success(`${closed} kudos cleared!`);
            }
        });

        const viewMoreLink: HTMLAnchorElement = document.getElementById('viewMore')! as HTMLAnchorElement;
        if (viewMoreLink) {
            viewMoreLink.onclick = () => chrome.runtime.sendMessage(new DataMessage(MessageType.Background, 'open_options'));
        }
    }

    private getNotifications(): HTMLDivElement[] {
        return Array.prototype.slice.call(document.querySelectorAll('.alert-notification'));
    }

    private filterNotifications(notifications: HTMLDivElement[], exclusions: string[]): HTMLDivElement[] {
        return notifications.filter(n => !containsOneOf((n.childNodes[1] as HTMLDivElement).innerText, exclusions));
    }

    private clickCloseOnNotification(notifications: HTMLDivElement[]): number {
        notifications.forEach(n => (n.childNodes[0] as HTMLButtonElement).click());
        return notifications?.length;
    }
}

new PageService();