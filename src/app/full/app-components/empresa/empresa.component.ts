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
    {value: 'Primaria', viewValue: 'Primaria'},
    {value: 'Secundaria', viewValue: 'Secundaria'},
    {value: 'Terciaria', viewValue: 'Terciaria'}
  ];
  companyTypes: CompanyType[] = [
    {value: 'Micro', viewValue: 'Micro'},
    {value: 'Mediana', viewValue: 'Mediana'},
    {value: 'Grande', viewValue: 'Grande'}
  ];
  formaJuridicas: FormaJuridica[] = [
    {value: 'Individuales', viewValue: 'Individuales'},
    {value: 'Sociedades', viewValue: 'Sociedades'}
  ];
  ambitoOpers: AmbitoOper[] = [
    {value: 'Locales', viewValue: 'Locales'},
    {value: 'Nacionales', viewValue: 'Nacionales'},
    {value: 'Regionales', viewValue: 'Regionales'},     
    {value: 'Multinacionales', viewValue: 'Multinacionales'}
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
