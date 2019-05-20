import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogUpdateData {
    messageHeader: string;
    messageButton: string;
  }

@Component({
    selector: 'app-dialog-update',
    templateUrl: 'dialog.update.component.html',
})
export class DialogUpdateComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogUpdateData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
