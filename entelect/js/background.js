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
        "id": "sampleContextMenu",
        "title": "Add to exclusion",
        "contexts": ["selection"]
    });
});


chrome.contextMenus.onClicked.addListener(function (data) {
    const selected = data.selectionText;

    chrome.storage.sync.get('notificationExclusions', function (data) {
        const values = data.notificationExclusions || [];
        values.push(selected);

        console.log(values);

        chrome.storage.sync.set({ 'notificationExclusions': values }, (data) => {

            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { "message": "success_notification", data: `'${selected}' added successfully.` });
            });
        });
    })
})