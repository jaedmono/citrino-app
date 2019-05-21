import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material-module';
import { AppComponent } from './app.component';
import { FullComponent } from './full/full.component';
import { AppHeaderComponent } from './full/header/header.component';
import { AppSidebarComponent } from './full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CitrinoComponent} from './shared/citrino.component';
import { AppComponentModule} from './full/app-components/app.component.modules';
import { CompanyService} from './full/service/company.service';
import { PerfilHorarioService} from './full/service/perfil.horario.service';
import { AlertService} from './full/service/alert.service';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { PoliticaEmpresaService } from './full/service/politicas.empresa.service';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    CitrinoComponent,
    AppSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFileUploaderModule,
    MaterialModule,
    AppComponentModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutingModule)
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    CompanyService,
    AlertService,
    PerfilHorarioService,
    PoliticaEmpresaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
