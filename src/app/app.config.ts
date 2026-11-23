import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideI18n } from './core/i18n/provide-i18n';

export const appConfig = {
  providers: [provideRouter(routes), ...provideI18n()],
};
