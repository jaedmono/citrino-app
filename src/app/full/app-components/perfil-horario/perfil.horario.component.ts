import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfilHorario} from '../../model/perfil.horario.model';
import { Company} from '../../model/company.model';
import { CompanyService} from '../../service/company.service';
import { PerfilHorarioService} from '../../service/perfil.horario.service';
import { DialogComponent} from '../dialog/dialog.component';
import { DialogUpdateComponent} from '../dialog/dialog-update/dialog.update.component';
import { AlertService} from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert.model';

export interface Season {
    value: string;
    viewValue: string;
}

export interface EmployeeType {
    value: string;
    viewValue: string;
}

export interface Journal {
    value: string;
    viewValue: string;
}



@Component({
  selector: 'app-perfil-horario',
  templateUrl: './perfil.horario.component.html',
  styleUrls: []
})
export class PerfilHorarioComponent implements AfterViewInit {
  displayedColumns: string[] = ['temporada',
                                'tipoEmpleado',
                                'jornadaSemanal',
                                'extras',
                                'bonos',
                                'otros',
                                'action'
                              ];
    selectedSeason: string;
    selectedEmployeeType: string;
    selectedJournal: string;
    selectedIdCompany: number;
    season: Season[] = [
        {value: 'Invierno', viewValue: 'Invierno'},
        {value: 'Primavera', viewValue: 'Primavera'},
        {value: 'Otoño', viewValue: 'Otoño'},
        {value: 'Verano', viewValue: 'Verano'}
      ];
      employeeTypes: EmployeeType[] = [
        {value: 'Administrativo', viewValue: 'Administrativo'},
        {value: 'Operario', viewValue: 'Operario'},
        {value: 'Oficinista', viewValue: 'Oficinista'},
        {value: 'Auxiliar', viewValue: 'Auxiliar'}
      ];
      journals: Journal[] = [
        {value: 'L-V', viewValue: 'Lunes-Viernes'},
        {value: 'L-S', viewValue: 'Lunes-Sabado'},
        {value: 'L-D', viewValue: 'Lunes-Domingo'}
      ];
  public data: PerfilHorario[];
  public companies: Company[];
  public perfilHorario = new PerfilHorario();
  message = 'Preferencia Creada.';
  @Input() id: string;

  constructor( private companyService: CompanyService,
               private alertService: AlertService,
               public dialog: MatDialog,
               private perfilHorarioService: PerfilHorarioService) {

  }

  ngAfterViewInit() {
    this.companyService.getCompanies().subscribe(data => {this.companies = data; });
  }

  createPerfilHorario(): void {
    this.perfilHorario.phoTemporada = this.selectedSeason;
    this.perfilHorario.phoTipoEmpleado = this.selectedEmployeeType;
    this.perfilHorario.phoJornada = this.selectedJournal;
    this.perfilHorario.idCompany = this.selectedIdCompany;

    /*this.perfilHorarioService.createPerfilHorario(this.perfilHorario)
        .subscribe( data => {
          this.alertService.alert(new Alert({
            message: this.message,
            type: AlertType.Success,
            alertId: this.id
        }));

    });*/

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