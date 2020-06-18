import { Component, OnInit } from '@angular/core';
import { ChromeUtils } from '../core/chrome-utils';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
    exclusions: string[] = [];
    chrome = new ChromeUtils();

    constructor(private readonly toastr: ToastrService) { }

    async ngOnInit(): Promise<void> {
        this.exclusions = await this.chrome.getStorage('notificationExclusions', []);

        console.log('Exclusions loaded', this.exclusions);
    }

    public drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.exclusions, event.previousIndex, event.currentIndex);
    }

    public clearExclusions(): void {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Remove all the items from the exclusions?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result: any) => {
            if (result.value) {
                this.exclusions = [];
                this.toastr.success(`Notification exclusions cleared`);
            }
        });
    }

    public async saveExlusions(): Promise<void> {
        console.log('Saving...');
        await this.chrome.setStorage('notificationExclusions', this.exclusions);
        console.log('Saved!', this.exclusions);

        this.toastr.success(`Notification exclusions saved`);
    }

    public removeExclusion(index: number) {
        this.exclusions.splice(index, 1);
    }

    public addExclusion(): void {
        this.exclusions.push('');
    }

    public trackByIndex(index: number, obj: any): number {
        return index;
    }
}
