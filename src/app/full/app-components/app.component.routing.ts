import { Routes } from '@angular/router';

import { EmpresaComponent } from './empresa/empresa.component';
import { ListEmpresaComponent } from './empresa-list/empresa.list.component';
import { PerfilHorarioComponent } from './perfil-horario/perfil.horario.component';
import { PoliticasEmpresaComponent } from './politicas-empresa/politicas.empresa.componente';
import { MetodosPagoComponent } from './metodos-pago/metodos.pago.component';
import { EstrategiaComponent } from './estrategia/estrategia.component';

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
  }
];
