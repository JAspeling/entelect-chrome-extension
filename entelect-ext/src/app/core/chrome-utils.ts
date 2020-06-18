import { DataMessage } from './message';

export class ChromeUtils {
    public sendMessage(message: DataMessage): void {
        console.log('Sending message to active tab...');
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            var activeTab = tabs[0];
            console.log(activeTab);
            // TODO: Might need to implement a promise-like callback here for the response.
            chrome.tabs.sendMessage(activeTab.id!, message);
        });
    }


    // Requires 'tabs' permission
    public getUrl(): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
                    let url = tabs[0].url;
                    resolve(url)
                });
            } catch (error) {
                reject(error)
            }
        })
    }

    // Requires 'tabs' permission
    public getHost(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const url = await this.getUrl();
                resolve(new URL(url).host);

            } catch (error) {
                reject(error);
            }
        })
    }

    public getStorage<T>(key: string, defaultValue: any = null): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            chrome.storage.sync.get(key, (data: any) => {
                if (data && data[key]) {
                    return resolve(data[key]);
                }
                return resolve(defaultValue);
            });
        })
    }

    public setStorage<T>(key: string, data: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            try {
                var obj: any = {};
                obj[key] = data;
                chrome.storage.sync.set(obj, () => {
                    resolve(data);
                })
            } catch (err) {
                reject(err);
            }
        });
    }

    public openOptions(): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.runtime.openOptionsPage(() => {
                resolve();
            });
        });
    }
    
}