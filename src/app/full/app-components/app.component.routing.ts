import { Routes } from '@angular/router';

import { EmpresaComponent } from './empresa/empresa.component';
import { ListEmpresaComponent } from './empresa-list/empresa.list.component';
import { PerfilHorarioComponent } from './perfil-horario/perfil.horario.component';
import { PoliticasEmpresaComponent } from './politicas-empresa/politicas.empresa.componente';
import { MetodosPagoComponent } from './metodos-pago/metodos.pago.component';
import { EstrategiaComponent } from './estrategia/estrategia.component';
import { CargarProcesoComponent} from './proceso/cargar-proceso/cargar.proceso.component';
import { ContextoEspacioComponent} from './contexto/contexto-espaciotemporal/contexto.espacio.temporal.component';
import { ContextoSocialComponent} from './contexto/contexto-social/contexto.social.component';

export const AppComponentRoutes: Routes = [
  {
    path: 'empresa',
    component: EmpresaComponent
  },
  {
    path: 'list-empresa',
    component: ListEmpresaComponent
  },
  {
    path: 'crear-perfil',
    component: PerfilHorarioComponent
  },
  {
    path: 'politicas-empresa',
    component: PoliticasEmpresaComponent
  },
  {
    path: 'metodos-pago',
    component: MetodosPagoComponent
  },
  {
    path: 'estrategia',
    component: EstrategiaComponent
  },
  {
    path: 'cargar-proceso',
    component: CargarProcesoComponent
  },
  {
    path: 'contexto-temporal',
    component: ContextoEspacioComponent
  },
  {
    path: 'contexto-social',
    component: ContextoSocialComponent
  }
];
