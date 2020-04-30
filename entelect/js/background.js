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
});


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
});

// let options = document.getElementById('options');
// let markAsRead = document.getElementById('markAsRead');

// options.onclick = function (element) {
//     chrome.runtime.openOptionsPage()
// }

// markAsRead.onclick = function (element) {
//     // chrome.tabs.executeScript({
//     //     file: 'js/dismiss-notifications.js'
//     // }, function () {
//     //     setTimeout(() => {
//     //         window.close();
//     //     }, 100)
//     // });

//     // Send a message to the active tab

//     console.log('clicked');

//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         var activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
//     });
// }
