import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AngularFileUploaderComponent } from 'angular-file-uploader';

export interface DataType {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-cargar-proceso',
  templateUrl: './cargar.proceso.component.html',
  styleUrls: []
})
export class CargarProcesoComponent {
    selectedDataType: string;
    dataTypes: DataType[] = [
        {value: 'Textil', viewValue: 'Textil'},
        {value: 'Tecnologica', viewValue: 'Tecnologica'},
        {value: 'Agropecuaria', viewValue: 'Agropecuaria'}
    ];

    @ViewChild('fileUpload1')
    private fileUpload1: AngularFileUploaderComponent;

  constructor( public dialog: MatDialog,
               private router: Router) {

  }

  afuConfig = {
    uploadAPI: {
      url: 'https://example-file-upload-api'
    }
  };
}
