import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';

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
               private alertService: AlertService) {

  }

  adaptar(): void {
    this.disableSpiner = true;
    setTimeout(() => {
    this.alertService.alert(new Alert({
          message: 'El proceso de adaptación fue terminado',
          type: AlertType.Success,
          alertId: this.id
      }));
    this.resourcesLoaded = true;
    }, 5000);
  }
}
