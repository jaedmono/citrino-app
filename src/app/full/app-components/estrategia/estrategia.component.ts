import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertService} from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert.model';


@Component({
  selector: 'app-estrategia',
  templateUrl: './estrategia.component.html',
  styleUrls: []
})
export class EstrategiaComponent implements AfterViewInit {
  message = 'Estrategia Creada.';
  @Input() id: string;

  constructor( private alertService: AlertService,
               public dialog: MatDialog) {

  }

  ngAfterViewInit() {
  }

  createEstrategia(): void {
    this.alertService.alert(new Alert({
        message: this.message,
        type: AlertType.Success,
        alertId: this.id
    }));
  }

}
