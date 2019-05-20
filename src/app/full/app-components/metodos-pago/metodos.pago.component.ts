import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfilHorario} from '../../model/perfil.horario.model';
import { Company} from '../../model/company.model';
import { CompanyService} from '../../service/company.service';
import { DialogComponent} from '../dialog/dialog.component';
import { DialogUpdateComponent} from '../dialog/dialog-update/dialog.update.component';
import { AlertService} from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert.model';
import { Router } from '@angular/router';
import { MetodosPago} from '../../model/medios.pago.model';

export interface PayMethod {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-metodos-pago',
  templateUrl: './metodos.pago.component.html',
  styleUrls: []
})
export class MetodosPagoComponent implements AfterViewInit {
  displayedColumns: string[] = ['destino', 'medioPago', 'action' ];
    selectedDataType: string;
    payMethods: PayMethod[] = [
        {value: 'Transferencia Banco', viewValue: 'Transferencia Banco'},
        {value: 'Efectivo', viewValue: 'Efectivo'},
        {value: 'Cheque', viewValue: 'Cheque'}
    ];
  public data: PerfilHorario[];
  public companies: Company[];
  public perfilHorario = new PerfilHorario();
  public payMethod = new MetodosPago();
  message = 'Metodo de Pago Creado.';
  @Input() id: string;

  constructor( private companyService: CompanyService,
               private alertService: AlertService,
               public dialog: MatDialog,
               private router: Router) {

  }

  ngAfterViewInit() {
    this.companyService.getCompanies().subscribe(data => {this.companies = data; });
  }

  createPayMethod(): void {
    this.alertService.alert(new Alert({
        message: this.message,
        type: AlertType.Success,
        alertId: this.id
    }));
  }

  deleteElement(element): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {messageHeader: 'Eliminar Preferencia', message: 'Esta seguro de borrar esta preferencia'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyService.deleteCompany(element)
          .subscribe( data => {
            this.data = this.data.filter(u => u !== element);
          });
      }
    });
  }

  updateElement(element): void {
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '650px',
      data: {messageHeader: 'Editar Empresa', shouldUpdate: true}
    });
  }

}
