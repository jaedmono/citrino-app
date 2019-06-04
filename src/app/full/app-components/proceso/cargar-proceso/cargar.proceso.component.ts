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
  message = 'Registros Cargados Exitosamente: ';
  errorMessage = ' Registros no cargados por errores en el archivo ';
  selectedIdIndustria: number;
  totalRecordsLoaded: number;
  totalRecordsLoadedError: number;

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
    this.totalRecordsLoaded = 0;
    this.totalRecordsLoadedError = 0;
  }

  fileChangeListener($event): void {

    const target = $event.target || $event.srcElement;
    const files = target.files;
    this.totalRecordsLoaded = 0;

    if (this.selectedIdIndustria === undefined) {
        const messageError = 'Porfavor seleccione un tipo de industria ';
        this.alertService.error(messageError);
        this.fileReset();
        return;
    }

    if (Constants.validateHeaderAndRecordLengthFlag) {
      if (!this.fileUtilService.isCSVFile(files[0])) {
        const messageError = 'Porfavor seleccione un archivo CSV valido ';
        this.alertService.error(messageError);
        this.fileReset();
        return;
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
    this.selectedIdIndustria = undefined;
    this.csvRecords = [];
    this.totalRecordsLoaded = 0;
    this.totalRecordsLoadedError = 0;
  }

  persistData(): void{
    let proceso: Proceso;
    let arrayProcessos: Proceso[];
    let isHeader = 0;
    arrayProcessos = [];
    for (const iterator of this.csvRecords) {
        if ( isHeader > 0) {
            proceso = new Proceso();
            proceso.idProcess = iterator[1];
            proceso.pcf = iterator[2];
            proceso.processDescription = iterator[3];
            proceso.ind = this.selectedIdIndustria;
            arrayProcessos.push(proceso);
        }
        isHeader += 1;
    }
    this.procesoService.addProcesses(arrayProcessos).subscribe( data => {
      this.alertService.success(this.message + data.recordsSucess);
    }, error => {
      this.alertService.error(this.errorMessage);
    });
  }


}
