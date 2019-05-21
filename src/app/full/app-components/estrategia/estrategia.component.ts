import { Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AlertService} from '../../service/alert.service';
import { Alert, AlertType } from '../../model/alert.model';
import { EstrategiaService } from '../../service/estrategia.service';
import { Estrategia } from '../../model/estrategia.model';
import { Router, ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-estrategia',
  templateUrl: './estrategia.component.html',
  styleUrls: []
})
export class EstrategiaComponent implements AfterViewInit {
  message = 'Estrategia Creada.';
  @Input() id: string;
  estrategia = new Estrategia();
  selectedIdCompany: number;
  estrategiaSelected: string;

  constructor( private alertService: AlertService,
               public dialog: MatDialog,
               public estrategiaService: EstrategiaService,
               private router: Router,
               private rout: ActivatedRoute) {

  }

  ngAfterViewInit() {
  }

  createEstrategia(): void {
    this.estrategia.nitCompany = this.selectedIdCompany;
    this.estrategia.pestSeleccion = this.estrategiaSelected;
    this.estrategiaService.createEstrategia(this.estrategia).subscribe(data => {
      this.alertService.alert(new Alert({
          message: this.message,
          type: AlertType.Success,
          alertId: this.id
      }));
    });
    
  }

  ngOnInit() {
    this.rout.params.subscribe(params => {
     this.selectedIdCompany = params['idCompany'];
     });
   }

}
