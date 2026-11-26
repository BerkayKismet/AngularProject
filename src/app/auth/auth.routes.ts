import { Routes } from '@angular/router';
import { matchAuthMode } from './auth-mode.matcher';

export const AUTH_ROUTES: Routes = [
  {
    path: 'corporate-register',
    loadChildren: () =>
      import('./corporate-register/corporate-register.routes').then(
        (m) => m.CORPORATE_REGISTER_ROUTES
      ),
  },
  {
    path: ':mode',
    canMatch: [matchAuthMode],
    loadComponent: () =>
      import('./auth-shell/auth-shell').then((m) => m.AuthShell),
  },
];
