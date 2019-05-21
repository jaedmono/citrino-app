import { Component, ViewChild, AfterViewInit, Input, ElementRef} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PerfilHorario} from '../../model/perfil.horario.model';
import { Company} from '../../model/company.model';
import { CompanyService} from '../../service/company.service';
import { PerfilHorarioService} from '../../service/perfil.horario.service';
import { DialogComponent} from '../dialog/dialog.component';
import { DialogUpdateComponent} from '../dialog/dialog-update/dialog.update.component';
import { AlertService} from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert.model';
import { Router } from '@angular/router';

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
    horasExtra: string;
    paganBonos: string;
    otrosReconocimientos: string;
    seasons: Season[] = [
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
  @ViewChild('title') nameField;
  labelButtonSuccess = 'Crear';
  labelButtonCancel = 'Siguiente';

  constructor( private companyService: CompanyService,
               private alertService: AlertService,
               public dialog: MatDialog,
               private perfilHorarioService: PerfilHorarioService,
               private router: Router) {

  }

  ngAfterViewInit() {
    this.companyService.getCompanies().subscribe(data => {this.companies = data; });
    this.perfilHorarioService.getPerfilesHorario().subscribe(data => {this.data = data; });
  }

  clearForm(): void {
    this.labelButtonCancel = 'Siguiente';
    this.labelButtonSuccess = 'Crear';
    this.selectedSeason = undefined;
    this.selectedEmployeeType = undefined;
    this.selectedJournal = undefined;
    this.selectedIdCompany = undefined;
    this.horasExtra = undefined;
    this.paganBonos = undefined;
    this.otrosReconocimientos = undefined;
  }

  createPerfilHorario(): void {
    this.perfilHorario.phoTemporada = this.selectedSeason;
    this.perfilHorario.phoTipoEmpleado = this.selectedEmployeeType;
    this.perfilHorario.phoJornada = this.selectedJournal;
    this.perfilHorario.idCompany = this.selectedIdCompany;
    this.perfilHorario.phoExtras = this.horasExtra;
    this.perfilHorario.phoBonos = this.paganBonos;
    this.perfilHorario.phoOtros = this.otrosReconocimientos;
    this.clearForm();

    this.perfilHorarioService.createPerfilHorario(this.perfilHorario)
        .subscribe( data => {
          this.data.push(data);
          this.alertService.alert(new Alert({
            message: this.message,
            type: AlertType.Success,
            alertId: this.id
        }));
    });
  }

  deleteElement(element): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {messageHeader: 'Eliminar Preferencia', message: 'Esta seguro de borrar esta preferencia'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.perfilHorarioService.deletePerfilHorario(element)
          .subscribe( data => {
            this.data = this.data.filter(u => u !== element);
          });
      }
    });
  }

  updateElement(element): void {
    this.selectedSeason = element.phoTemporada;
    this.selectedEmployeeType = element.phoTipoEmpleado;
    this.selectedJournal = element.phoJornada;
    this.selectedIdCompany = element.idCompany;
    this.horasExtra = element.phoExtras;
    this.paganBonos = element.phoBonos;
    this.otrosReconocimientos = element.phoOtros;
    this.perfilHorario = element;
    this.nameField.nativeElement.focus();
    this.labelButtonSuccess = 'Actualizar';
    this.labelButtonCancel = 'Cancelar';
  }


}
