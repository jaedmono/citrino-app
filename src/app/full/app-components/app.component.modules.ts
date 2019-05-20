
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../app-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponentRoutes } from './app.component.routing';
import { EmpresaComponent } from './empresa/empresa.component';
import { ListEmpresaComponent } from './empresa-list/empresa.list.component';
import { AlertComponent} from './alert/alert.component';
import { DialogComponent} from '../app-components/dialog/dialog.component';
import { DialogUpdateComponent} from '../app-components/dialog/dialog-update/dialog.update.component';
import { PerfilHorarioComponent } from './perfil-horario/perfil.horario.component';
import { PoliticasEmpresaComponent } from './politicas-empresa/politicas.empresa.componente';
import { MetodosPagoComponent } from './metodos-pago/metodos.pago.component';
import { EstrategiaComponent } from './estrategia/estrategia.component';
import { CargarProcesoComponent} from './proceso/cargar-proceso/cargar.proceso.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { ContextoEspacioComponent} from './contexto/contexto-espaciotemporal/contexto.espacio.temporal.component';
import { ContextoSocialComponent} from './contexto/contexto-social/contexto.social.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AppComponentRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    AngularFileUploaderModule
  ],
  providers: [],
  entryComponents: [DialogComponent, DialogUpdateComponent],
  declarations: [
    EmpresaComponent,
    ListEmpresaComponent,
    AlertComponent,
    DialogComponent,
    DialogUpdateComponent,
    PerfilHorarioComponent,
    PoliticasEmpresaComponent,
    MetodosPagoComponent,
    EstrategiaComponent,
    CargarProcesoComponent,
    ContextoEspacioComponent,
    ContextoSocialComponent
  ]
})
export class AppComponentModule {}
