export class Popup {
    private options: HTMLAnchorElement;
    private clearNotifications: HTMLButtonElement;

    constructor() {
        this.options = document.getElementById('options')! as HTMLAnchorElement;
        this.clearNotifications = document.getElementById('markAsRead')! as HTMLButtonElement;
    }

    public DOMContentLoaded(): void {
        document.addEventListener("DOMContentLoaded", () => {
            this.clearNotifications.onclick = (event: MouseEvent) => {
                chrome.tabs.query({ currentWindow: true, active: true }, function (tabs: chrome.tabs.Tab[]) {
                    const activeTab: chrome.tabs.Tab = tabs[0];
                    chrome.tabs.sendMessage(activeTab.id!, { message: "clear_notifications" });
                });
            }

            this.options.onclick = function (element) {
                chrome.runtime.openOptionsPage()
            }
        });

    }
}

const popup = new Popup();
popup.DOMContentLoaded();