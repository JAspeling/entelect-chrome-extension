import { DataMessage } from '../shared/message';
import { getStorage, containsOneOf } from '../shared/utils';
declare const Swal: any;

/**
 * This will act as a script that will be run on the active page. 
 * Listens to messages from the background script.
 *
 * @export
 * @class Page
 */
export class Page {
    private exclusions: string[] = [];

    constructor() {
        this.addListeners();
    }

    private addListeners() {
        chrome.runtime.onMessage.addListener((request: DataMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
            switch (request.message) {
                case 'clear_notifications': this.clearNotifications(); break;
                case 'success_notification': toastr.success(request.data); break;
                case 'error_notification': toastr.error(request.data); break;
                case 'warning_notification': toastr.warning(request.data); break;
            }
        });
    }

    private clearNotifications() {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will clear all the notifications according to the options",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result: any) => {
            if (result.value) {
                getStorage<string[]>('notificationExclusions').then((values) => {
                    this.exclusions = values;
                    console.log('Clearing notifications, excluding: ', this.exclusions);

                    [...document.querySelectorAll('.alert-notification')]
                        .filter(n => !containsOneOf((n.childNodes[1] as HTMLDivElement).innerText, this.exclusions, true))
                        .forEach(n => (n.childNodes[0] as HTMLButtonElement).click());

                    toastr.success('Cleared!');
                })
            }
        });
    }
}

const page = new Page();