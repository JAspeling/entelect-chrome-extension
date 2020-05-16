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

    private sendMessage(message: string, data: any) {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            var activeTab = tabs[0];
            // TODO: Might need to implement a promise-like callback here for the response.
            chrome.tabs.sendMessage(activeTab.id!, { message, data });
        });
    }

    private setStorage<T>(key: string, data: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            var obj: any = {};
            obj[key] = data;
            chrome.storage.sync.set(obj, () => {
                resolve(data);
            })
        });
    }

    private getStorage<T>(key: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            chrome.storage.sync.get(key, (data: any) => {
                resolve(data);
            });
        })
    }

    private async addToExclusions(context: any): Promise<void> {
        const selected = context.selectionText.trim();

        const values: string[] = await this.getStorage('notificationExclusions');

        if (values.find(val => val.toLowerCase() === selected.toLowerCase())) {
            return this.sendMessage('warning_notification', `${selected} already in the exclusion list.`);
        }
        values.push(selected);
        console.log(values);

        try {
            await this.setStorage('notificationExclusions', values);
            return this.sendMessage('success_notification', `'${selected}' added successfully.`);
        } catch (error) {
            return this.sendMessage('error_notification', `Failed to add '${selected}'.`);
        }
    }
}

// runs the script.
const background = new Background();