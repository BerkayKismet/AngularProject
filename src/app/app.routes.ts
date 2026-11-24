import { Routes } from '@angular/router';
import { matchAuthMode } from './auth/auth.routes';

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
    path: 'corporate-register',
    loadChildren: () =>
      import('./corporate-register/corporate-register.routes').then(
        (m) => m.CORPORATE_REGISTER_ROUTES
      ),
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
