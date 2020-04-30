let options = document.getElementById('options');
let markAsRead = document.getElementById('markAsRead');





function clearNotifications() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        console.log(activeTab);
        chrome.tabs.sendMessage(activeTab.id, { "message": "clear_notifications" });
    });
}





document.addEventListener("DOMContentLoaded", function () {
    // Clear notifications
    markAsRead.onclick = function (element) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            var activeTab = tabs[0];
            console.log(activeTab);
            chrome.tabs.sendMessage(activeTab.id, { "message": "clear_notifications" });
        });
    }
});
