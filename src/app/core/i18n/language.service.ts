import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';
import {
  DEFAULT_LOCALE,
  Locale,
  LOCALE_STORAGE_KEY,
  LOCALES,
  isRtlLocale,
} from './locale';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(private readonly transloco: TranslocoService) {}

  get current(): Locale {
    const lang = this.transloco.getActiveLang();
    return LOCALES.includes(lang as Locale)
      ? (lang as Locale)
      : DEFAULT_LOCALE;
  }

  init(): Promise<void> {
    return this.setLocale(this.readStoredLocale() ?? DEFAULT_LOCALE, false);
  }

  setLocale(locale: Locale, persist = true): Promise<void> {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtlLocale(locale) ? 'rtl' : 'ltr';

    if (persist) {
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      } catch {
        // Storage erişilemezse dil yine de uygulanır.
      }
    }

    return firstValueFrom(this.transloco.load(locale)).then(() => {
      this.transloco.setActiveLang(locale);
    });
  }

  private readStoredLocale(): Locale | null {
    try {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      return LOCALES.includes(saved as Locale) ? (saved as Locale) : null;
    } catch {
      return null;
    }
  }
}
