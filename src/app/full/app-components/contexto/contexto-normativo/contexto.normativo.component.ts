import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { Router } from '@angular/router';




@Component({
  selector: 'app-contexto-normativo',
  templateUrl: './contexto.normativo.component.html',
  styleUrls: []
})
export class ContextoNormativoComponent {
  displayedColumns: string[] = ['id',
                                'norma',
                                'item',
                                'descripcion',
                                'valor',
                                'implicacion',
                                'action'
                              ];
  message = 'Contexto Normativo Creado.';
  @Input() id: string;

  constructor( private alertService: AlertService,
               public dialog: MatDialog,
               private router: Router) {

  }

  createContextoNormativo(): void {

    this.alertService.alert(new Alert({
        message: this.message,
        type: AlertType.Success,
        alertId: this.id
    }));
  }

}
