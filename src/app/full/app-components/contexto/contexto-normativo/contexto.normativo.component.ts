import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent} from '../../dialog/dialog.component';
import { ContextoRegulatorio } from '../../../model/contexto.regulatorio.model';
import { ContextoRegulatorioService} from '../../../service/contexto.regulatorio.service';




@Component({
  selector: 'app-contexto-normativo',
  templateUrl: './contexto.normativo.component.html',
  styleUrls: []
})
export class ContextoNormativoComponent implements AfterViewInit {
  displayedColumns: string[] = ['id',
                                'norma',
                                'item',
                                'valor',
                                'implicacion',
                                'action'
                              ];
  message = 'Contexto Normativo Creado.';
  @Input() id: string;
  contextoRegulatorio: ContextoRegulatorio = new ContextoRegulatorio();
  data: ContextoRegulatorio[];
  labelButtonSuccess = 'Crear';
  labelButtonCancel = 'Siguiente';
  shuldCanceled = false;
  selectedIdCompany: number;

  constructor( private alertService: AlertService,
               public dialog: MatDialog,
               private router: Router,
               private contextoRegulatorioService: ContextoRegulatorioService,
               private rout: ActivatedRoute) {

  }

  ngOnInit() {
    this.rout.params.subscribe(params => {
     this.selectedIdCompany = params['idCompany'];
     });
   }

   ngAfterViewInit() {
    this.refreshData();
  }

  refreshData(): void {
    this.contextoRegulatorioService.getConextosRegulatorios().subscribe(data => {this.data = data; });
  }

  clearForm(): void {
    this.contextoRegulatorio = new ContextoRegulatorio();
    this.labelButtonSuccess = 'Crear';
    this.labelButtonCancel = 'Siguiente';
    this.shuldCanceled = false;
  }

 createContextoNormativo(): void {
   this.contextoRegulatorio.idCompany = this.selectedIdCompany;
   this.contextoRegulatorioService.createContextoRegulatorio(this.contextoRegulatorio).subscribe(data => {
     this.alertService.alert(new Alert({
         message: this.message,
         type: AlertType.Success,
         alertId: this.id
     }));
     this.clearForm();
     this.refreshData();
   });
 }

 updateElement(element): void {
   this.contextoRegulatorio = element;
   this.shuldCanceled = true;
   this.labelButtonSuccess = 'Actualizar';
   this.labelButtonCancel = 'Cancelar';
   this.message = 'Contexto Social Modificada.';
 }

 deleteElement(element): void {
   const dialogRef = this.dialog.open(DialogComponent, {
     width: '450px',
     data: {messageHeader: 'Eliminar Contexto Normativo', message: 'Esta seguro de borrar este contexto normativo'}
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.contextoRegulatorioService.deleteContextoRegulatorio(element)
         .subscribe( data => {
           this.data = this.data.filter(u => u !== element);
         });
     }
   });
 }

 cancelEvent(): void {
   if ( this.shuldCanceled) {
     this.clearForm();
   } else {
     this.router.navigate(['/citrino/contexto-tecnico', this.selectedIdCompany]);
   }
 }


}
