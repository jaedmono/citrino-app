import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl} from '@angular/forms';
import { ContextoClimaService } from '../../../service/contexto.clima.service';
import { ContextoLocalizacionService } from '../../../service/contexto.localizacion.service';
import { ContextoTemporadaService } from '../../../service/contexto.temporada.service';
import { ContextoClima } from '../../../model/contexto.clima.model';
import { ContextoLocalizacion } from '../../../model/contexto.localizacion.model';
import { ContextoTemporada } from '../../../model/contexto.temporada.model';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { CompanyService} from '../../../service/company.service';
import { Company} from '../../../model/company.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contexto-espacio',
  templateUrl: './contexto.espacio.temporal.html',
  styleUrls: []
})
export class ContextoEspacioComponent implements AfterViewInit {

  constructor(  public dialog: MatDialog,
                private contextoClimaService: ContextoClimaService,
                private contextoLocalizacionService: ContextoLocalizacionService,
                private contextoTemporadaService: ContextoTemporadaService,
                private alertService: AlertService,
                private companyService: CompanyService,
                private router: Router,
                private rout: ActivatedRoute) {

  }
  seasons = new FormControl();
  toppingList: string[] =  ['Navidad', 'Semana Santa', 'Fin de Año', 'Mitad de Año'];
  contextoClima: ContextoClima = new ContextoClima();
  public contextoLocalizacion: ContextoLocalizacion = new ContextoLocalizacion();
  contextoTemporada: ContextoTemporada = new ContextoTemporada();
  messageClimaService = 'Información de contexto clima insertado';
  messageLocalizacionService = 'Información de contexto Localizacion insertado';
  messageTemporadaService = 'Información de contexto Temporada insertado';
  public companies: Company[];
  public selectedIdCompany: number;
  public selectedSeasons: string[];

  idAlert = '0';
  calido: boolean;
  frio: boolean;
  templado: boolean;
  paramo: boolean;
  topping: boolean;

  ngAfterViewInit() {
    this.refreshData();
  }

  refreshData(): void {
    this.companyService.getCompanies().subscribe(data => {this.companies = data; });
  }

  createTemporalContext(): void {
    this.contextoLocalizacion.idCompany = this.selectedIdCompany;
    this.contextoLocalizacionService.createContextoLocalizacion(this.contextoLocalizacion).subscribe(data => {
      this.alertService.alert(new Alert({
          message: this.messageLocalizacionService,
          type: AlertType.Success,
          alertId: this.idAlert
      }));
      this.refreshData();
    });

    if ( this.selectedSeasons !== undefined) {
      for ( const season of this.selectedSeasons) {
        this.setTemporadaContext(this.selectedIdCompany, season);
      }
    }

    if (this.calido) {
      this.setClimaContext(this.selectedIdCompany, 'Cálido');
    }

    if (this.frio) {
      this.setClimaContext(this.selectedIdCompany, 'Frío');
    }

    if (this.templado) {
      this.setClimaContext(this.selectedIdCompany, 'Templado');
    }

    if (this.paramo) {
      this.setClimaContext(this.selectedIdCompany, 'Paramo');
    }

  }

  setClimaContext(idCompany, type): void {
    this.contextoClima.idCompany = idCompany;
    this.contextoClima.type = type;
    this.contextoClimaService.createContextoClima(this.contextoClima).subscribe(data => {
      this.alertService.alert(new Alert({
          message: this.messageClimaService,
          type: AlertType.Success,
          alertId: this.idAlert
      }));
    });
  }

  setTemporadaContext(idCompany, name): void{
    this.contextoTemporada.idCompany = idCompany;
    this.contextoTemporada.name = name;
    this.contextoTemporadaService.createContextoTemporada(this.contextoTemporada).subscribe(data => {
      this.alertService.alert(new Alert({
          message: this.messageTemporadaService,
          type: AlertType.Success,
          alertId: this.idAlert
      }));
    });
  }

  cancelEvent(): void {
    this.router.navigate(['/citrino/contexto-social', this.selectedIdCompany]);
  }


}
