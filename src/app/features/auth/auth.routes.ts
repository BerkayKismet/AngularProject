import { CanMatchFn, Routes, UrlSegment } from '@angular/router';

export const matchAuthMode: CanMatchFn = (_route, segments: UrlSegment[]) => {
  const mode = segments[0]?.path;
  return mode === 'login' || mode === 'register';
};

export const AUTH_ROUTES: Routes = [
  {
    path: ':mode',
    canMatch: [matchAuthMode],
    loadComponent: () =>
      import('./pages/auth-shell/auth-shell').then((m) => m.AuthShell),
  },
];
