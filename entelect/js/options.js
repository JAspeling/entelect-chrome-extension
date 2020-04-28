function isNullOrUndefined(value) {
    return value == null || value == undefined;
}

let exclusions = document.getElementById('exclusions');
let addExclusionButton = document.getElementById('addExclusion');

const saveExclusions = document.getElementById('saveExclusions');

saveExclusions.onclick = function () {
    saveOptions();
}

function addExclusion(exclusion) {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("form-group");
    itemContainer.classList.add("row");

    let inputContainer = document.createElement("div");
    inputContainer.classList.add("col-11");

    let inputElement = document.createElement("input");
    inputElement.classList.add("form-control");
    inputElement.value = exclusion;

    inputContainer.appendChild(inputElement);

    let removeElement = document.createElement("button");
    removeElement.classList.add("btn");
    removeElement.classList.add("btn-danger");
    removeElement.classList.add("remove");
    removeElement.textContent = "-";

    itemContainer.appendChild(inputContainer);
    itemContainer.appendChild(removeElement);

    removeElement.addEventListener('click', function () {
        debugger;
        exclusions.removeChild(itemContainer);
    });
    exclusions.appendChild(itemContainer);
}

// Function to add the saved options here.
function getOptions() {
    chrome.storage.sync.get('notificationExclusions', function (data) {
        const value = data.notificationExclusions;

        if (!isNullOrUndefined(value) && value.length > 0) {

            value.forEach(val => addExclusion(val));
        } else {
            console.log('Values not found.', value);
        }
    })
}

function saveOptions() {
    // Save the Value items
    var inputs = [...exclusions.querySelectorAll('input')].map(input => input.value);

    chrome.storage.sync.set({ 'notificationExclusions': inputs });
}

getOptions();

addExclusionButton.onclick = function () {
    addExclusion("");
}