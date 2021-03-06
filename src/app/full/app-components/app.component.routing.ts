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
import { ContextoNormativoComponent} from './contexto/contexto-normativo/contexto.normativo.component';
import { ContextoTecnicoComponent} from './contexto/contexto-tecnico/contexto.tecnico.component';
import { IniciarProcesoComponent} from './proceso/iniciar-proceso/iniciar.proceso.component';
import { BpmnComponent} from './proceso/BPMN/bpmn.component';
import { IndustriaComponent} from './configuracion/industria.component';
import { ConsultarProcesoComponent} from './proceso/consultar-proceso/consultar.proceso.component';

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
    path: 'politicas-empresa/:idCompany',
    component: PoliticasEmpresaComponent
  },
  {
    path: 'metodos-pago/:idCompany',
    component: MetodosPagoComponent
  },
  {
    path: 'estrategia/:idCompany',
    component: EstrategiaComponent
  },
  {
    path: 'cargar-proceso',
    component: CargarProcesoComponent
  },
  {
    path: 'consultar-proceso',
    component: ConsultarProcesoComponent
  },
  {
    path: 'contexto-temporal',
    component: ContextoEspacioComponent
  },
  {
    path: 'contexto-social/:idCompany',
    component: ContextoSocialComponent
  },
  {
    path: 'contexto-normativo/:idCompany',
    component: ContextoNormativoComponent
  },
  {
    path: 'contexto-tecnico/:idCompany',
    component: ContextoTecnicoComponent
  },
  {
    path: 'iniciar-proceso',
    component: IniciarProcesoComponent
  },
  {
    path: 'ver-proceso',
    component: BpmnComponent
  },
  {
    path: 'industria',
    component: IndustriaComponent
  }
];
