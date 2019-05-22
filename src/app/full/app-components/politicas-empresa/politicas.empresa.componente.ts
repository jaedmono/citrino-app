import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfilHorario} from '../../model/perfil.horario.model';
import { Company} from '../../model/company.model';
import { CompanyService} from '../../service/company.service';
import { DialogComponent} from '../dialog/dialog.component';
import { DialogUpdateComponent} from '../dialog/dialog-update/dialog.update.component';
import { AlertService} from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert.model';
import { Router, ActivatedRoute  } from '@angular/router';
import { PoliticaEmpresa} from '../../model/politica.empresa.model';
import { PoliticaEmpresaService } from '../../service/politicas.empresa.service';

export interface DataType {
    value: string;
    viewValue: string;
}

@Component({
  selector: 'app-politicas-empresa',
  templateUrl: './politicas.empresa.component.html',
  styleUrls: []
})
export class PoliticasEmpresaComponent implements AfterViewInit {
  displayedColumns: string[] = ['variable', 'descripcion', 'valor', 'tipo', 'action' ];
  selectedDataType: string;
  dataTypes: DataType[] = [
      {value: 'Texto', viewValue: 'Texto'},
      {value: 'Número', viewValue: 'Número'},
      {value: 'Fecha', viewValue: 'Fecha'}
  ];
  public data: PoliticaEmpresa[];
  public companies: Company[];
  public perfilHorario = new PerfilHorario();
  public politicaEmpresa = new PoliticaEmpresa();
  message = 'Politica Creada.';
  @Input() idCompany: string;
  selectedIdCompany: number;
  labelButtonSuccess = 'Crear';
  labelButtonCancel = 'Siguiente';
  shuldCanceled = false;

  constructor( private companyService: CompanyService,
               private politicaEmpresaService: PoliticaEmpresaService,
               private alertService: AlertService,
               public dialog: MatDialog,
               private router: Router,
               private rout: ActivatedRoute) {

  }

  ngOnInit() {
    this.rout.params.subscribe(params => {
     this.selectedIdCompany = params['idCompany'];
     });
   }

  clearForm(): void {
    this.labelButtonCancel = 'Siguiente';
    this.labelButtonSuccess = 'Crear';
    //this.selectedIdCompany = undefined;
    this.selectedDataType = undefined;
    this.politicaEmpresa = new PoliticaEmpresa();
    this.message = 'Politica Creada.';
    this.shuldCanceled = false;
  }

  ngAfterViewInit() {
    this.companyService.getCompanies().subscribe(data => {this.companies = data; });
    this.refreshData();
  }
  
  refreshData(): void {
    this.politicaEmpresaService.getPerfilesPolitica().subscribe(data => {this.data = data; });
  }

  createPoliticaEmpresa(): void {
    this.politicaEmpresa.idCompany = this.selectedIdCompany;
    this.politicaEmpresa.ppolTipoDato = this.selectedDataType;
    this.politicaEmpresaService.createPerfilHorario(this.politicaEmpresa)
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
      data: {messageHeader: 'Eliminar Politica', message: 'Esta seguro de borrar esta politica'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.politicaEmpresaService.deletePerfilPolitica(element)
          .subscribe( data => {
            this.data = this.data.filter(u => u !== element);
          });
      }
    });
  }

  updateElement(element): void {
    this.politicaEmpresa = element;
    //this.selectedIdCompany = element.idCompany;
    this.selectedDataType = element.ppolTipoDato;
    this.labelButtonSuccess = 'Actualizar';
    this.labelButtonCancel = 'Cancelar';
    this.message = 'Politica Modificada.';
    this.shuldCanceled = true;
  }

  cancelEvent(): void {
    if ( this.shuldCanceled) {
      this.clearForm();
    } else {
      this.router.navigate(['/citrino/metodos-pago',this.selectedIdCompany]);
    }
  }

}
