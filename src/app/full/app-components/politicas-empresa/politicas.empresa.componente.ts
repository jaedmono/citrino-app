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
import { PoliticaEmpresa} from '../../model/politica.empresa.model';

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
  public data: PerfilHorario[];
  public companies: Company[];
  public perfilHorario = new PerfilHorario();
  public politicaEmpresa = new PoliticaEmpresa();
  message = 'Politica Creada.';
  @Input() id: string;

  constructor( private companyService: CompanyService,
               private alertService: AlertService,
               public dialog: MatDialog,
               private router: Router) {

  }

  ngAfterViewInit() {
    this.companyService.getCompanies().subscribe(data => {this.companies = data; });
  }

  createPoliticaEmpresa(): void {
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
