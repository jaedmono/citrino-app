import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { BpmnService} from '../../../service/bpmn.service';
import { BpmnResponse} from '../../../model/bpmn.response.model';

@Component({
  selector: 'app-iniciar-proceso',
  templateUrl: './iniciar.proceso.component.html',
  styleUrls: []
})
export class IniciarProcesoComponent {
  @Input() id: string;
  resourcesLoaded = false;
  disableSpiner = false;
  constructor( public dialog: MatDialog,
               private router: Router,
               private alertService: AlertService,
               private bpmnService: BpmnService) {

  }

  adaptar(): void {
    this.disableSpiner = true;
    this.bpmnService.getProcesses().subscribe(data => {
      let document = (new DOMParser()).parseFromString(data.bpmn, "text/xml");
      this.alertService.success('El proceso de adaptación fue terminado haga click en el boton Ver BPMN');
      this.resourcesLoaded = false;
      this.disableSpiner = false;
    }, error => {
      this.alertService.error('No fue posible cargar el proceso de adaptación');
      this.disableSpiner = false;
    });
    
  }
}
