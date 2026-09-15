import ar from './locales/ar.json';
import ckb from './locales/ckb.json';

export const locales = ['en', 'ar', 'ckb'] as const;
export type Locale = typeof locales[number];
export const languageNames = { en: 'English', ar: 'العربية', ckb: 'کوردی' } as const;
export const languageDirections = { en: 'ltr', ar: 'rtl', ckb: 'rtl' } as const;
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const localeFromPath = (path: string): Locale => {
  const segment = path.split('/')[1];
  return isLocale(segment) ? segment : 'en';
};
export function withoutLocale(path: string) {
  return path.replace(/^\/(en|ar|ckb)(?=\/|\?|#|$)/, '') || '/';
}
export function localePath(path: string, locale: Locale) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const bare = withoutLocale(path);
  return locale === 'en' ? bare : `/${locale}${bare.startsWith('/') ? bare : `/${bare}`}`;
}
const dictionaries: Record<Locale, Record<string, string>> = { en: {}, ar, ckb };
export type Translator = (text: string | undefined | null, values?: Record<string, string | number>) => string;
export function translator(locale: Locale): Translator {
  return (text, values = {}) => {
    if (!text) return '';
    const key = text.trim().replace(/\s+/g, ' ');
    const translated = dictionaries[locale][key];
    const result = locale === 'en' || !translated ? text : `${text.match(/^\s*/)?.[0] ?? ''}${translated}${text.match(/\s*$/)?.[0] ?? ''}`;
    return result.replace(/\{(\w+)\}/g, (match, name) => values[name] === undefined ? match : String(values[name]));
  };
}
export function formatNumber(locale: Locale, count: number) {
  return new Intl.NumberFormat(locale).format(count);
}
