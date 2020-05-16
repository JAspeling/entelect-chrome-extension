import { isNullOrUndefined } from '../shared/utils';
declare const Swal: any;

export class Options {

    private sortableNamesContainer: JQuery<HTMLDivElement> = $('#exclusions');
    private exclusions: HTMLDivElement = document.getElementById('exclusions')! as HTMLDivElement;

    private addExclusionButton: HTMLButtonElement = document.getElementById('addExclusion')! as HTMLButtonElement;
    private clearExclusionButton: HTMLButtonElement = document.getElementById('clearExclusions')! as HTMLButtonElement;
    private saveExclusionsButton: HTMLButtonElement = document.getElementById('saveExclusions')! as HTMLButtonElement;

    get inputs(): string[] {
        return [...this.exclusions.querySelectorAll('input')].map((input: HTMLInputElement) => input.value);
    }

    constructor() {
        this.injectSortable();

        this.addListeners();
    }

    private injectSortable(): void {
        // ui-sortable
        (this.sortableNamesContainer as any).sortable();
    }

    private addListeners() {
        this.saveExclusionsButton.onclick = () => {
            this.saveOptions();
        }

        this.addExclusionButton.onclick = () => {
            this.addExclusion('');
        }

        this.clearExclusionButton.onclick = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "This will clear all the saved exclusions.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(((result: any) => {
                if (result.value) {
                    [...this.exclusions.children].forEach(node => this.exclusions.removeChild(node));
                }
            }));
        }
    }

    private addExclusion(exclusion: string): void {
        const itemContainer: HTMLDivElement = document.createElement("div");
        itemContainer.classList.add('row', 'form-group');

        let inputContainer = this.createInputContainer(exclusion);
        let removeElement = this.createRemoveButton();

        itemContainer.appendChild(inputContainer);
        itemContainer.appendChild(removeElement);

        removeElement.addEventListener('click', () => {
            this.exclusions.removeChild(itemContainer);
        });
        this.exclusions.appendChild(itemContainer);
    }

    private getOptionsFromChrome(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            chrome.storage.sync.get('notificationExclusions', function (data) {
                const values: string[] = data.notificationExclusions;
                if (values?.length > 0) {
                    resolve(values);
                } else {
                    reject(`[notificationExclusions] - Values not found.'`)
                }
            })
        })
    }

    private createRemoveButton(): HTMLButtonElement {
        const removeElement: HTMLButtonElement = document.createElement("button");
        removeElement.classList.add('btn', 'btn-danger', 'remove');
        removeElement.textContent = "-";
        return removeElement;
    }

    private createInputContainer(exclusion: string): HTMLDivElement {
        const inputContainer: HTMLDivElement = document.createElement("div");
        inputContainer.classList.add("col-11", "exclusion-item");

        const moveIcon: HTMLElement = document.createElement("i");
        moveIcon.classList.add("fa", "fa-reorder");

        const moveElement: HTMLDivElement = document.createElement("div");
        moveElement.classList.add("drag-handler");
        moveElement.appendChild(moveIcon);

        const inputElement: HTMLInputElement = document.createElement("input");
        inputElement.classList.add("form-control");
        inputElement.value = exclusion;
        inputContainer.appendChild(moveElement);
        inputContainer.appendChild(inputElement);
        return inputContainer;
    }

    private async loadOptions(): Promise<void> {
        const options = await this.getOptionsFromChrome();
        options.forEach(option => this.addExclusion(option));
    }

    private saveOptions(): void {
        chrome.storage.sync.set({ 'notificationExclusions': this.inputs }, () => {
            toastr.success('Saved!');
        });
    }
}

const options = new Options();