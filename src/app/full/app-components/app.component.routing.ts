import { Routes } from '@angular/router';

import { EmpresaComponent } from './empresa/empresa.component';
import { ListEmpresaComponent } from './empresa-list/empresa.list.component';
import { PerfilHorarioComponent } from './perfil-horario/perfil.horario.component';

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
  }
];
