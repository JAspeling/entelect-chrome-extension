let options = document.getElementById('options');
let clearNotifications = document.getElementById('markAsRead');

document.addEventListener("DOMContentLoaded", function () {
    clearNotifications.onclick = function (element) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { message: "clear_notifications" });
        });
    }

    options.onclick = function (element) {
        chrome.runtime.openOptionsPage()
    }
});
