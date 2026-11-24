import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom, isDevMode } from '@angular/core';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TranslocoModule,
  translocoConfig,
} from '@ngneat/transloco';
import { LanguageService } from './language.service';
import { DEFAULT_LOCALE, LOCALES } from './locale';

export function provideI18n() {
  return [
    importProvidersFrom(HttpClientModule, TranslocoModule),
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [...LOCALES],
        defaultLang: DEFAULT_LOCALE,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        missingHandler: {
          // TR `register.terms.prefix` gibi bilinçli boş metinler anahtar olarak basılmasın
          allowEmpty: true,
        },
      }),
    },
    {
      provide: TRANSLOCO_LOADER,
      deps: [HttpClient],
      useFactory: (http: HttpClient) => ({
        getTranslation: (lang: string) => {
          const cacheBust = isDevMode() ? `?t=${Date.now()}` : '';
          return http.get(`./assets/i18n/${lang}.json${cacheBust}`);
        },
      }),
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [LanguageService],
      useFactory: (language: LanguageService) => () => language.init(),
    },
  ];
}
