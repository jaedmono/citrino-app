import { Component, ViewChild, AfterViewInit, Input, Output} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { BpmnService} from '../../../service/bpmn.service';
import { BpmnResponse} from '../../../model/bpmn.response.model';
import { Company} from '../../../model/company.model';
import { CompanyService} from '../../../service/company.service';
import { Proceso } from '../../../model/proceso.model';
import { IndustriaService} from '../../../service/industria.service';
import { Industria } from '../../../model/industria.model';
import { ProcesoService} from '../../../service/proceso.service';

@Component({
  selector: 'app-iniciar-proceso',
  templateUrl: './iniciar.proceso.component.html',
  styleUrls: []
})
export class IniciarProcesoComponent implements AfterViewInit {
  @Input() id: string;
  resourcesLoaded = false;
  disableSpiner = false;
  public companies: Company[];
  public industries: Industria[] ;
  public processes: Proceso[];
  selectedIdIndustry: number;
  selectedIdProcess: number;
  selectedIdCompany: number;
  documentXml: string;

  constructor( public dialog: MatDialog,
               private router: Router,
               private alertService: AlertService,
               private bpmnService: BpmnService,
               private companyService: CompanyService,
               private procesoService: ProcesoService,
               private industriaService: IndustriaService) {

  }

  ngAfterViewInit() {
    this.companyService.getCompanies().subscribe(data => {this.companies = data; });
    this.industriaService.getIndustrias().subscribe(data => {this.industries = data; });
  }

  refreshProcessData(): void {
    this.procesoService.getProcessesByIndustry(this.selectedIdIndustry).subscribe( data => {
        this.processes = data;
      }
    );
  }

  adaptar(): void {
    if (this.selectedIdCompany === undefined || this.selectedIdProcess === undefined) {
        this.alertService.error('Porfavor seleccionar empresa y proceso para procesar');
        return;
    }
    this.disableSpiner = true;
    this.bpmnService.getBpmnFile(this.selectedIdCompany, this.selectedIdProcess).subscribe(data => {
      this.documentXml = data.bpmn;
      this.alertService.success('El proceso de adaptación fue terminado haga click en el boton Ver BPMN');
      this.resourcesLoaded = true;
      this.disableSpiner = false;
    }, error => {
      this.alertService.error('No fue posible cargar el proceso de adaptación');
      this.disableSpiner = false;
    });
  }
}
