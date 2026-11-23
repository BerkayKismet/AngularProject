export type Locale = 'tr' | 'en' | 'ar';

export const LOCALES: readonly Locale[] = ['tr', 'en', 'ar'];

export const DEFAULT_LOCALE: Locale = 'tr';

export const LOCALE_STORAGE_KEY = 'app-locale';

export function isRtlLocale(locale: Locale): boolean {
  return locale === 'ar';
}
