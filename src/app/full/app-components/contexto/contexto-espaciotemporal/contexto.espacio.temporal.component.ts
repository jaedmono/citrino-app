import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl} from '@angular/forms';
import { ContextoClimaService } from '../../../service/contexto.clima.service';
import { ContextoLocalizacionService } from '../../../service/contexto.localizacion.service';
import { ContextoTemporadaService } from '../../../service/contexto.temporada.service';
import { ContextoClima } from '../../../model/contexto.clima.model';
import { ContextoLocalizacion } from '../../../model/contexto.localizacion.model';
import { ContextoTemporada } from '../../../model/contexto.temporada.model';
import { ContextoEspaciotemporalService } from '../../../service/contexto.espaciotemporal.service';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { CompanyService} from '../../../service/company.service';
import { Company} from '../../../model/company.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContextoEspacioTemporal } from '../../../model/contexto.espaciotemporal.model';
import { DialogComponent} from '../../dialog/dialog.component';

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
                private contextoEspaciotemporalService: ContextoEspaciotemporalService,
                private alertService: AlertService,
                private companyService: CompanyService,
                private router: Router,
                private rout: ActivatedRoute) {

  }

  displayedColumns: string[] = ['company',
                                'city',
                                'country',
                                'season',
                                'weather',
                                'action'
                              ];

  seasons = new FormControl();
  toppingList: string[] =  ['Navidad', 'Semana Santa', 'Fin de Año', 'Mitad de Año'];
  contextoClima: ContextoClima = new ContextoClima();
  public contextoLocalizacion: ContextoLocalizacion = new ContextoLocalizacion();
  contextoTemporada: ContextoTemporada = new ContextoTemporada();
  messageClimaService = 'Información de contexto clima insertado';
  messageLocalizacionService = 'Información de contexto Localizacion insertado';
  messageTemporadaService = 'Información de contexto Temporada insertado';
  message = 'Contexto Espacio Temporal Creado.';
  public companies: Company[];
  public data: ContextoEspacioTemporal[];
  public selectedIdCompany: number;
  public selectedSeasons: string[];
  labelButtonSuccess = 'Crear';
  labelButtonCancel = 'Siguiente';
  shuldCanceled = false;
  climaSelected: string;

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
    this.contextoEspaciotemporalService.getConextosEspacioTemporal().subscribe(dataE => {this.data = dataE; });
  }

  clearForm(): void {
    this.contextoClima = new ContextoClima();
    this.contextoLocalizacion = new ContextoLocalizacion();
    this.contextoTemporada = new ContextoTemporada();
    this.calido = false;
    this.templado = false;
    this.frio = false;
    this.paramo = false;
    this.labelButtonSuccess = 'Crear';
    this.labelButtonCancel = 'Siguiente';
    this.shuldCanceled = false;
    this.climaSelected = undefined;
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
      this.clearForm();
    });

    this.setTemporadaContext(this.selectedIdCompany);

    this.setClimaContext(this.selectedIdCompany, this.climaSelected);

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

  setTemporadaContext(idCompany): void{
    this.contextoTemporada.idCompany = idCompany;
    this.contextoTemporadaService.createContextoTemporada(this.contextoTemporada).subscribe(data => {
      this.alertService.alert(new Alert({
          message: this.messageTemporadaService,
          type: AlertType.Success,
          alertId: this.idAlert
      }));
      this.refreshData();
    });
  }

  loadElemntInfo(element): void {
    this.contextoClima.type = element.type;
    this.contextoClima.idClima = element.idClima;
    this.contextoClima.idCompany = element.idCompany;
    this.contextoLocalizacion.idLocalizacion = element.idLocalizacion;
    this.contextoLocalizacion.city = element.city;
    this.contextoLocalizacion.country = element.country;
    this.contextoLocalizacion.idCompany = element.idCompany;
    this.contextoTemporada.idSeason = element.idSeason;
    this.contextoTemporada.name = element.name;
    this.contextoTemporada.idCompany = element.idCompany;
  }

  updateElement(element): void {
    this.loadElemntInfo(element);
    this.selectedIdCompany = element.idCompany;
    this.climaSelected = element.type;
    this.calido = false;
    this.templado = false;
    this.frio = false;
    this.paramo = false;
    this.shuldCanceled = true;
    this.labelButtonSuccess = 'Actualizar';
    this.labelButtonCancel = 'Cancelar';
    this.message = 'Contexto Espacio Temporal Modificado.';
  }

  deleteElement(element): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {messageHeader: 'Eliminar Contexto Espacio Temporal', message: 'Esta seguro de borrar este contexto de espacio temporal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadElemntInfo(element);
        this.contextoClimaService.deleteContextoClima(this.contextoClima)
        .subscribe( data => {
          this.refreshData();
        });
        this.contextoLocalizacionService.deleteContextoLocalizacion(this.contextoLocalizacion)
        .subscribe( data => {
          this.refreshData();
        });
        this.contextoTemporadaService.deleteContextoTemporada(this.contextoTemporada)
          .subscribe( data => {
            this.refreshData();
          });
      }
    });
  }

  cancelEvent(): void {
    if ( this.shuldCanceled) {
      this.clearForm();
    } else {
      this.router.navigate(['/citrino/contexto-social', this.selectedIdCompany]);
    }
  }


}
