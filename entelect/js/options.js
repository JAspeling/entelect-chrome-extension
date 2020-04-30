// ui-sortable 
$("#exclusions").sortable();

let exclusions = document.getElementById('exclusions');
let addExclusionButton = document.getElementById('addExclusion');
let clearExclusionButton = document.getElementById('clearExclusions');

const saveExclusions = document.getElementById('saveExclusions');

saveExclusions.onclick = function () {
    saveOptions();
}

function addExclusion(exclusion) {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add('row', 'form-group');

    let inputContainer = createInputContainer(exclusion);
    let removeElement = createRemoveButton();

    itemContainer.appendChild(inputContainer);
    itemContainer.appendChild(removeElement);

    removeElement.addEventListener('click', function () {
        exclusions.removeChild(itemContainer);
    });
    exclusions.appendChild(itemContainer);
}

function createRemoveButton() {
    let removeElement = document.createElement("button");
    removeElement.classList.add('btn', 'btn-danger', 'remove');
    removeElement.textContent = "-";
    return removeElement;
}

function createInputContainer(exclusion) {
    let inputContainer = document.createElement("div");
    inputContainer.classList.add("col-11", "exclusion-item");

    let moveIcon = document.createElement("i");
    moveIcon.classList.add("fa", "fa-reorder");
    let moveElement = document.createElement("div");
    moveElement.classList.add("drag-handler");
    moveElement.appendChild(moveIcon);

    let inputElement = document.createElement("input");
    inputElement.classList.add("form-control");
    inputElement.value = exclusion;
    inputContainer.appendChild(moveElement);
    inputContainer.appendChild(inputElement);
    return inputContainer;
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

    chrome.storage.sync.set({ 'notificationExclusions': inputs }, (data) => {
        toastr.success('Saved!');
    });
}

getOptions();

addExclusionButton.onclick = function () {
    addExclusion("");
}

clearExclusionButton.onclick = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will clear all the saved exclusions.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            [...exclusions.children].forEach(node => exclusions.removeChild(node));
        }
    });

}