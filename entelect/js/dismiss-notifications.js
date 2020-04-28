exclusions = [];

var containsOneOf = function (value, strings, ignoreCase = true) {
    let target = value;

    target = ignoreCase ? target.toLocaleUpperCase() : target;
    if (!strings || strings.length === 0) {
        return false;
    }

    strings = strings.map((str) => {
        return ignoreCase ? str.toLocaleUpperCase() : str;
    });
    for (const str of strings) {
        if (target.includes(str)) {
            return true;
        }
    }

    return false;
};
chrome.storage.sync.get('notificationExclusions', function (data) {
    exclusions = data.notificationExclusions;
    console.log('Excluding', exclusions);

    [...document.querySelectorAll('.alert-notification')]
        .filter(n => !containsOneOf(n.childNodes[1].innerText, exclusions, true))
        .forEach(n => n.childNodes[0].click());
});