import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

import { FileUtilService } from '../../../service/file.load.service';
import { ProcesoService} from '../../../service/proceso.service';
import { Constants } from './test.constants';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { Proceso } from '../../../model/proceso.model';
import { IndustriaService} from '../../../service/industria.service';
import { Industria } from '../../../model/industria.model';


export interface DataType {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-cargar-proceso',
  templateUrl: './cargar.proceso.component.html',
  styleUrls: []
})

export class CargarProcesoComponent implements AfterViewInit{
    selectedDataType: string;
    industrias: Industria[] ;

  @ViewChild('fileImportInput')
  fileImportInput: any;
  message = 'Archivo Cargado Exitosamente';

  csvRecords = [];

  constructor( public dialog: MatDialog,
               private router: Router,
               private alertService: AlertService,
               private fileUtilService: FileUtilService,
               private procesoService: ProcesoService,
               private industriaService: IndustriaService) {

  }

  ngAfterViewInit() {
    this.industriaService.getIndustrias().subscribe(data => {this.industrias = data; });
  }

  fileChangeListener($event): void {

    const target = $event.target || $event.srcElement;
    const files = target.files;

    if (Constants.validateHeaderAndRecordLengthFlag) {
      if (!this.fileUtilService.isCSVFile(files[0])) {
        const messageError = 'Porfavor seleccione un archivo CSV valido ';
        const idMessage = '1';
        this.alertService.alert(new Alert({
            message: messageError,
            type: AlertType.Error,
            alertId: idMessage
        }));
        this.fileReset();
      }
    }

    const input = $event.target;
    const reader = new FileReader();
    reader.readAsText(input.files[0], 'iso-8859-1');

    reader.onload = (data) => {
      const csvData = reader.result;
      const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

      let headerLength = -1;
      if (Constants.isHeaderPresentFlag) {
        const headersRow = this.fileUtilService.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length;
      }

      this.csvRecords = this.fileUtilService.getDataRecordsArrayFromCSVFile(csvRecordsArray,
          headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter);

      if (this.csvRecords == null) {
        this.fileReset();
      } else {
        this.persistData();
      }
    };

    reader.onerror = function() {
      const messageError = 'Unable to read ' + input.files[0];
      const idMessage = '1';
      alert(messageError);
      /*this.alertService.alert(new Alert({
          message: messageError,
          type: AlertType.Error,
          alertId: idMessage
      }));*/
    };
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = '';
    this.csvRecords = [];
  }

  persistData(): void{
    let proceso: Proceso;
    let isHeader = 0;
    for (const iterator of this.csvRecords) {
        if ( isHeader > 0) {
            proceso = new Proceso();
            proceso.idProcess = iterator[1];
            proceso.pcf = iterator[2];
            proceso.processDescription = iterator[3];
            proceso.ind = iterator[4];
            this.procesoService.addProcesses(proceso).subscribe( data => {
              const idMessage = 'Success';
              this.alertService.alert(new Alert({
                  message: this.message,
                  type: AlertType.Success,
                  alertId: idMessage
              }));
            });
        }
        isHeader += 1;
    }
  }


}
