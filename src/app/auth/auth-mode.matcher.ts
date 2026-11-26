import { CanMatchFn, UrlSegment } from '@angular/router';

export const matchAuthMode: CanMatchFn = (_route, segments: UrlSegment[]) => {
  const mode = segments[0]?.path;
  return mode === 'login' || mode === 'register';
};
