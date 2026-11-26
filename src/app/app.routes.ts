import { Routes } from '@angular/router';
import { matchAuthMode } from './auth/auth-mode.matcher';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: ':mode',
    outlet: 'modal',
    canMatch: [matchAuthMode],
    loadComponent: () =>
      import('./auth/auth-shell/auth-shell').then((m) => m.AuthShell),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
