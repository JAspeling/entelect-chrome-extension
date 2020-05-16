import { DataMessage } from '../shared/message';
import { getStorage, setStorage } from '../shared/utils';

export class Background {

    constructor() {
        this.onInstalled();
        this.addListeners();
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

    private addListeners(): void {
        chrome.contextMenus.onClicked.addListener((data) => this.addToExclusions(data));
    }

    private sendMessage(message: DataMessage) {
        console.log('Sending Message', message);
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            var activeTab = tabs[0];
            // TODO: Might need to implement a promise-like callback here for the response.
            chrome.tabs.sendMessage(activeTab.id!, message);
        });
    }

    private async addToExclusions(context: chrome.contextMenus.OnClickData): Promise<void> {
        if (!context.selectionText) return;
        const selected = context.selectionText.trim();

        const values: string[] = await getStorage('notificationExclusions', []);

        if (values.find(val => val.toLowerCase() === selected.toLowerCase())) {
            return this.sendMessage(new DataMessage('warning_notification', `${selected} already in the exclusion list.`));
        }
        values.push(selected);
        console.log(values);

        try {
            await setStorage('notificationExclusions', values);
            return this.sendMessage(new DataMessage('success_notification', `'${selected}' added successfully.`));
        } catch (error) {
            return this.sendMessage(new DataMessage('error_notification', `Failed to add '${selected}'.`));
        }
    }
}

// runs the script.
const background = new Background();