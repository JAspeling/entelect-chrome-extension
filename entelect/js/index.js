let options = document.getElementById('options');
let markAsRead = document.getElementById('markAsRead');

options.onclick = function (element) {
    chrome.runtime.openOptionsPage()
}

markAsRead.onclick = function (element) {

    chrome.tabs.executeScript({
        file: 'js/dismiss-notifications.js'
    }, setTimeout(() => {
        window.close();
    }, 100));
}