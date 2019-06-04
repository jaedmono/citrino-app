import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfilHorario} from '../../model/perfil.horario.model';
import { Company} from '../../model/company.model';
import { CompanyService} from '../../service/company.service';
import { DialogComponent} from '../dialog/dialog.component';
import { DialogUpdateComponent} from '../dialog/dialog-update/dialog.update.component';
import { AlertService} from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilMetodoPago} from '../../model/metodo.pago.model';
import { MetodoPagoService } from '../../service/metodo.pago.service';

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
  payMethods: PayMethod[] = [
      {value: 'Transferencia Banco', viewValue: 'Transferencia Banco'},
      {value: 'Efectivo', viewValue: 'Efectivo'},
      {value: 'Cheque', viewValue: 'Cheque'}
  ];
  public data: PerfilMetodoPago[];
  public companies: Company[];
  public perfilHorario = new PerfilHorario();
  public payMethod = new PerfilMetodoPago();
  message = 'Metodo de Pago Creado.';
  @Input() id: string;
  selectedIdCompany: number;
  selectedPayMethod: string;
  labelButtonSuccess = 'Crear';
  labelButtonCancel = 'Siguiente';
  shuldCanceled = false;

  constructor( private companyService: CompanyService,
               private alertService: AlertService,
               private metdosPagoService: MetodoPagoService,
               public dialog: MatDialog,
               private router: Router,
               private rout: ActivatedRoute) {

  }

  ngOnInit() {
    this.rout.params.subscribe(params => {
     this.selectedIdCompany = params['idCompany'];
     });
   }

  ngAfterViewInit() {
    this.companyService.getCompanies().subscribe(data => {this.companies = data; });
    this.refreshData();
  }
  
  refreshData(): void {
    this.metdosPagoService.getMetodosPago().subscribe(data => {this.data = data; });
  }

  createPayMethod(): void {
    this.payMethod.idCompany = this.selectedIdCompany;
    this.payMethod.pmpMedioPago = this.selectedPayMethod;
    this.metdosPagoService.createMetodoPago(this.payMethod).subscribe(data => {
      this.alertService.alert(new Alert({
          message: this.message,
          type: AlertType.Success,
          alertId: this.id
      }));
      this.refreshData();
      this.clearForm();
    });
  }

  deleteElement(element): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {messageHeader: 'Eliminar Preferencia', message: 'Esta seguro de borrar esta preferencia'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.metdosPagoService.deleteMetodoPago(element)
          .subscribe( data => {
            this.data = this.data.filter(u => u !== element);
          });
      }
    });
  }

  clearForm(): void {
    this.labelButtonCancel = 'Siguiente';
    this.labelButtonSuccess = 'Crear';
    //this.selectedIdCompany = undefined;
    this.selectedPayMethod = undefined;
    this.payMethod = new PerfilMetodoPago();
    this.message = 'Politica Creada.';
    this.shuldCanceled = false;
  }


  updateElement(element): void {
    //this.selectedIdCompany = element.idCompany;
    this.payMethod = element;
    this.selectedPayMethod = element.pmpMedioPago;
    this.shuldCanceled = true;
    this.labelButtonSuccess = 'Actualizar';
    this.labelButtonCancel = 'Cancelar';
    this.message = 'Politica Modificada.';
  }

  cancelEvent(): void {
    if ( this.shuldCanceled) {
      this.clearForm();
    } else {
      this.router.navigate(['/citrino/estrategia', this.selectedIdCompany]);
    }
  }

}
