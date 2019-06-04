import { Component, AfterViewInit, Input} from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogComponent} from '../dialog/dialog.component';
import { AlertService} from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert.model';
import { Router, ActivatedRoute  } from '@angular/router';
import { Industria} from '../../model/industria.model';
import { IndustriaService } from '../../service/industria.service';

export interface DataType {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-industria',
  templateUrl: './industria.component.html',
  styleUrls: []
})
export class IndustriaComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'descripcion', 'action' ];
  public data: Industria[];
  public industria = new Industria();
  message = 'Industria Insertada';
  @Input() idCompany: string;
  selectedIdCompany: number;
  labelButtonSuccess = 'Crear';
  labelButtonCancel = 'Siguiente';
  shuldCanceled = false;

  constructor( private industriaService: IndustriaService,
               private alertService: AlertService,
               public dialog: MatDialog,
               private router: Router,
               private rout: ActivatedRoute) {

  }


  clearForm(): void {
    this.labelButtonCancel = 'Siguiente';
    this.labelButtonSuccess = 'Crear';
    this.industria = new Industria();
    this.message = 'Industria Insertada.';
    this.shuldCanceled = false;
  }

  ngAfterViewInit() {
    this.refreshData();
  }

  refreshData(): void {
    this.industriaService.getIndustrias().subscribe(data => {this.data = data; });
  }

  createPoliticaEmpresa(): void {
    this.industriaService.createIndustria(this.industria)
      .subscribe(data => {
        this.alertService.alert(new Alert({
          message: this.message,
          type: AlertType.Success,
          alertId: this.idCompany
        }));
        this.refreshData();
      });
    this.clearForm();
  }

  deleteElement(element): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {messageHeader: 'Eliminar Industria', message: 'Esta seguro de borrar esta industria'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.industriaService.deleteIndustria(element)
          .subscribe( data => {
            this.data = this.data.filter(u => u !== element);
          });
      }
    });
  }

  updateElement(element): void {
    this.industria = element;
    this.labelButtonSuccess = 'Actualizar';
    this.labelButtonCancel = 'Cancelar';
    this.message = 'Industria Modificada.';
    this.shuldCanceled = true;
  }

  cancelEvent(): void {
    if ( this.shuldCanceled) {
      this.clearForm();
    }
  }

}
