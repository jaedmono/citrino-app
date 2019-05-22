import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertService} from '../../../service/alert.service';
import { Alert, AlertType } from '../../../model/alert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContextoSocialService } from '../../../service/contexto.social.service';
import { ContextoSocial } from '../../../model/contexto.social.model';
import { DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-contexto-social',
  templateUrl: './contexto.social.component.html',
  styleUrls: []
})
export class ContextoSocialComponent implements AfterViewInit {
  displayedColumns: string[] = ['id',
                                'tipo',
                                'valor',
                                'implicacion',
                                'action'
                              ];
  message = 'Contexto Social Creado.';
  @Input() id: string; 
  selectedIdCompany: number;
  labelButtonSuccess = 'Crear';
  labelButtonCancel = 'Siguiente';
  shuldCanceled = false;
  contextoSocial: ContextoSocial = new ContextoSocial();
  data: ContextoSocial[];

  constructor( private alertService: AlertService,
               public dialog: MatDialog,
               private router: Router,
               private rout: ActivatedRoute,
               private contextoSocialService: ContextoSocialService) {

  }


  ngOnInit() {
    this.rout.params.subscribe(params => {
     this.selectedIdCompany = params['idCompany'];
     });
   }

   ngAfterViewInit() {
    this.contextoSocialService.getConextosSociales().subscribe(data => {this.data = data; });
  }

   clearForm(): void {
     this.contextoSocial = new ContextoSocial();
     this.labelButtonSuccess = 'Crear';
     this.labelButtonCancel = 'Siguiente';
     this.shuldCanceled = false;
   }

  createContextoSocial(): void {
    this.contextoSocial.idCompany = this.selectedIdCompany;
    this.contextoSocialService.createContextoSocial(this.contextoSocial).subscribe(data => {
      this.alertService.alert(new Alert({
          message: this.message,
          type: AlertType.Success,
          alertId: this.id
      }));
      this.clearForm();
    });
  }

  updateElement(element): void {
    this.contextoSocial = element;
    this.shuldCanceled = true;
    this.labelButtonSuccess = 'Actualizar';
    this.labelButtonCancel = 'Cancelar';
    this.message = 'Contexto Social Modificada.';
  }

  deleteElement(element): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {messageHeader: 'Eliminar Contexto Social', message: 'Esta seguro de borrar este contexto social'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contextoSocialService.deleteContextoSocial(element)
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
      this.router.navigate(['/citrino/contexto-normativo', this.selectedIdCompany]);
    }
  }

}
