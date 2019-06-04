import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent} from '../../dialog/dialog.component';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { Router, ActivatedRoute  } from '@angular/router';
import { Proceso} from '../../../model/proceso.model';
import { Industria} from '../../../model/industria.model';
import { ProcesoService } from '../../../service/proceso.service';
import { IndustriaService} from '../../../service/industria.service';

export interface DataType {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-consultar-proceso',
  templateUrl: './consultar.proceso.component.html',
  styleUrls: []
})
export class ConsultarProcesoComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'idProcess', 'pcf', 'processDescription', 'ind' ];
  public data: Proceso[];
  public industrias: Industria[];
  selectedIdIndustria: number;
  labelButtonSuccess = 'Crear';
  labelButtonCancel = 'Siguiente';
  shuldCanceled = false;

  constructor( private procesoService: ProcesoService,
               private industriaService: IndustriaService,
               private alertService: AlertService,
               public dialog: MatDialog,
               private router: Router,
               private rout: ActivatedRoute) {

  }

  clearForm(): void {
    this.labelButtonCancel = 'Siguiente';
    this.labelButtonSuccess = 'Crear';
    this.shuldCanceled = false;
  }

  ngAfterViewInit() {
    this.procesoService.getProcesses().subscribe(data => {this.data = data; });
    this.industriaService.getIndustrias().subscribe(data => {this.industrias = data;});
  }

  refreshData(): void {
    this.data = undefined;
    this.procesoService.getProcessesByIndustry(this.selectedIdIndustria).subscribe(data => {this.data = data; });
  }

}
