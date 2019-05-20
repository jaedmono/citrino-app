import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-contexto-espacio',
  templateUrl: './contexto.espacio.temporal.html',
  styleUrls: []
})
export class ContextoEspacioComponent {
  displayedColumns: string[] = ['temporada', 'action'];

  constructor(  public dialog: MatDialog) {

  }


}
