let options = document.getElementById('options');
let markAsRead = document.getElementById('markAsRead');

options.onclick = function (element) {
    chrome.runtime.openOptionsPage()
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log(sender.tab ?
//         "from a content script:" + sender.tab.url :
//         "from the extension");
//     if (request == "MarkAllAsRead")
//         chrome.tabs.executeScript({
//             file: 'dismiss-notifications.js'
//         });
// })

markAsRead.onclick = function (element) {

    console.log(`sendMessage 'MarkAllAsRead'`);

    chrome.tabs.executeScript({
        file: 'js/dismiss-notifications.js'
    }, function () {
        console.log('script executed');
        setTimeout(() => {
            window.close();
        }, 100)
    });


    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, "MarkAllAsRead", function (response) {
    //         console.log(response);
    //     });
    // });
}