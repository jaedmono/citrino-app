
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


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AppComponentRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  entryComponents: [DialogComponent],
  declarations: [
    EmpresaComponent,
    ListEmpresaComponent,
    AlertComponent,
    DialogComponent
  ]
})
export class AppComponentModule {}