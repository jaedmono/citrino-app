import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../model/company.model';
import { CompanyService} from '../../service/company.service';

import { AlertService} from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';

export interface Actecono {
  value: string;
  viewValue: string;
}

export interface CompanyType {
  value: string;
  viewValue: string;
}

export interface FormaJuridica {
  value: string;
  viewValue: string;
}

export interface AmbitoOper {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: []
})
export class EmpresaComponent {
  selectedActividadEco: string;
  selectedCompanyType: string;
  selectedFormaJuridica: string;
  selectedAmbitoOper: string;
  acteconos: Actecono[] = [
    {value: 'Industria', viewValue: 'Industria'},
    {value: 'Tecnologia', viewValue: 'Tecnologia'},
    {value: 'Comercio', viewValue: 'Comercio'},
    {value: 'Agropecuaria', viewValue: 'Agropecuaria'}
  ];
  companyTypes: CompanyType[] = [
    {value: 'Persona Natural', viewValue: 'Persona Natural'},
    {value: 'Unipersonal', viewValue: 'Unipersonal'},
    {value: 'Sociedad por Acciones', viewValue: 'Sociedad por Acciones'},
    {value: 'Sociedad Colectiva', viewValue: 'Sociedad Colectiva'}
  ];
  formaJuridicas: FormaJuridica[] = [
    {value: 'Sociedad', viewValue: 'Sociedad'},
    {value: 'Unipersonal', viewValue: 'Unipersonal'},
    {value: 'Por Acciones', viewValue: 'Por Acciones'},
    {value: 'Colectiva', viewValue: 'Colectiva'}
  ];
  ambitoOpers: AmbitoOper[] = [
    {value: 'Regional', viewValue: 'Regional'},
    {value: 'Nacional', viewValue: 'Nacional'},
    {value: 'Multinacional', viewValue: 'Multinacional'}
  ];
  company: Company = new Company();
  message = 'Empresa Creada.';
  titleView = 'Crear Empresa';
  @Input() id: string;
  @Input() shouldUpdate: boolean;

  constructor(private router: Router, private companyService: CompanyService, private alertService: AlertService) {
    if (this.shouldUpdate) {
      this.titleView = 'Editar Empresa';
    }
   }

  createCompany(): void {
    this.company.companyType = this.selectedCompanyType;
    this.company.acteconomia = this.selectedActividadEco;
    this.company.ambitooper = this.selectedAmbitoOper;
    this.company.fjuridica = this.selectedFormaJuridica;

    this.companyService.createCompany(this.company)
        .subscribe( data => {
          this.alertService.alert(new Alert({
            message: this.message,
            type: AlertType.Success,
            alertId: this.id
        }));

    });
  }

  clearCompany(): void {
    this.company = new Company();
    this.selectedCompanyType = undefined;
    this.selectedActividadEco = undefined;
    this.selectedAmbitoOper = undefined;
    this.selectedFormaJuridica = undefined;
  }
}
