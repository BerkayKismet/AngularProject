import { Routes } from '@angular/router';

export const CORPORATE_REGISTER_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./corporate-register').then((m) => m.CorporateRegister),
  },
];
