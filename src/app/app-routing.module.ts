
import { Routes } from '@angular/router';
import { FullComponent } from './full/full.component';

export const AppRoutingModule: Routes = [{
  path: '',
  component: FullComponent,
  children: [
    {
      path: '',
      redirectTo: '/citrino',
      pathMatch: 'full'
    },
    {
      path: 'citrino',
      loadChildren:
        './full/app-components/app.component.modules#AppComponentModule'
    },
    {
      path: 'starter',
      loadChildren: './starter/starter.module#StarterModule'
    }
  ]
}];


