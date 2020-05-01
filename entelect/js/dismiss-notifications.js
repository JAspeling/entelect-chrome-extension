exclusions = [];

const clearNotifications = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will clear all the notifications according to the options",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            chrome.storage.sync.get('notificationExclusions', function (data) {
                exclusions = data.notificationExclusions;
                console.log('Clearing notifications, excluding: ', exclusions);

                [...document.querySelectorAll('.alert-notification')]
                    .filter(n => !containsOneOf(n.childNodes[1].innerText, exclusions, true))
                    .forEach(n => n.childNodes[0].click());

                toastr.success('Cleared!');
            });
        }
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clear_notifications") {

        }

        switch (request.message) {
            case 'clear_notifications': clearNotifications(); break;
            case 'success_notification': toastr.success(request.data); break;
            case 'error_notification': toastr.error(request.data); break;
            case 'warning_notification': toastr.warning(request.data); break;
        }
    }
);
