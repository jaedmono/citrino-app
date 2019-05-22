import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContextoTecnico } from '../../../model/contexto.tecnico.model';
import { ContextoTecnicoService} from '../../../service/contexto.tecnico.service';
import { DialogComponent} from '../../dialog/dialog.component';




@Component({
  selector: 'app-contexto-tecnico',
  templateUrl: './contexto.tecnico.component.html',
  styleUrls: []
})
export class ContextoTecnicoComponent implements AfterViewInit {
  displayedColumns: string[] = ['id',
                                'tecnologia',
                                'variable',
                                'valor',
                                'action'
                              ];
  message = 'Contexto Tecnico Creado.';
  @Input() id: string;
  contextoTecnico: ContextoTecnico = new ContextoTecnico();
  data: ContextoTecnico[];
  labelButtonSuccess = 'Crear';
  labelButtonCancel = 'Siguiente';
  shuldCanceled = false;
  selectedIdCompany: number;

  constructor( private alertService: AlertService,
               public dialog: MatDialog,
               private router: Router,
               private rout: ActivatedRoute,
               private contextoTecnicoService: ContextoTecnicoService) {

  }

  ngOnInit() {
    this.rout.params.subscribe(params => {
     this.selectedIdCompany = params['idCompany'];
     });
   }

   ngAfterViewInit() {
    this.refreshData();
  }

  refreshData(): void{
    this.contextoTecnicoService.getConextosTecnicos().subscribe(data => {this.data = data; });
  }

  clearForm(): void {
    this.contextoTecnico = new ContextoTecnico();
    this.labelButtonSuccess = 'Crear';
    this.labelButtonCancel = 'Siguiente';
    this.shuldCanceled = false;
  }

 createContextoTecnico(): void {
   this.contextoTecnico.idCompany = this.selectedIdCompany;
   this.contextoTecnicoService.createContextoTecnico(this.contextoTecnico).subscribe(data => {
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
   this.contextoTecnico = element;
   this.shuldCanceled = true;
   this.labelButtonSuccess = 'Actualizar';
   this.labelButtonCancel = 'Cancelar';
   this.message = 'Contexto Tecnico Modificada.';
 }

 deleteElement(element): void {
   const dialogRef = this.dialog.open(DialogComponent, {
     width: '450px',
     data: {messageHeader: 'Eliminar Contexto Tecnico', message: 'Esta seguro de borrar este contexto tecnico'}
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.contextoTecnicoService.deleteContextoTecnico(element)
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
     this.router.navigate(['/citrino/iniciar-proceso']);
   }
 }


}
