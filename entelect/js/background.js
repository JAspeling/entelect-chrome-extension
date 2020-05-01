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

function sendMessage(message, data) {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { message, data });
    });
}

const setStorage = (key, data, callback) => {
    chrome.storage.sync.set({}[key] = data, (data) => {
        callback(undefined, data);
    });
}

const getStorage = (key, callback) => {
    chrome.storage.sync.get(key, (data) => {
        callback(data)
    });
}

chrome.contextMenus.onClicked.addListener(function (data) {
    if (data.menuItemId === 'addToExclusions') {
        const selected = data.selectionText.trim();

        getStorage('notificationExclusions', (data) => {
            const values = data.notificationExclusions || [];

            if (values.find(val => val.toLowerCase() === selected.toLowerCase())) {
                return sendMessage('warning_notification', `${selected} already in the exclusion list.`);
            }

            values.push(selected);
            console.log(values);

            setStorage('notificationExclusions', data, (error, data) => {
                if (error) {
                    return sendMessage('error_notification', `Failed to add '${selected}'.`);
                }
                return sendMessage('success_notification', `'${selected}' added successfully.`);
            })
        });
    }
})