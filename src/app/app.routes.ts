import { Routes } from '@angular/router';
import { matchAuthMode } from './features/auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: ':mode',
    outlet: 'modal',
    canMatch: [matchAuthMode],
    loadComponent: () =>
      import('./features/auth/pages/auth-shell/auth-shell').then(
        (m) => m.AuthShell,
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
