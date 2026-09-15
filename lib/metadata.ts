import type { Metadata } from 'next';
import { deploymentOrigin } from './site-config';
import { locales, localePath, translator, type Locale } from './i18n';
export const origin = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'production' ? deploymentOrigin : 'http://localhost:3016')).replace(/\/$/, '');
export function pageMetadata(title: string, description: string, path: string, image = '/og/home.jpg', privatePage = false, locale: Locale = 'en'): Metadata {
  const t = translator(locale);
  const localizedTitle = t(title), localizedDescription = t(description);
  return { title: localizedTitle, description: localizedDescription, alternates: { canonical: `${origin}${localePath(path, locale)}`, languages: { ...Object.fromEntries(locales.map(l => [l, `${origin}${localePath(path, l)}`])), 'x-default': `${origin}${localePath(path, 'en')}` } }, openGraph: { title: `${localizedTitle} | NORTHFORGE GROUP`, description: localizedDescription, url: `${origin}${localePath(path, locale)}`, locale: { en: 'en_GB', ar: 'ar_IQ', ckb: 'ckb_IQ' }[locale], alternateLocale: locales.filter(l => l !== locale).map(l => ({en: 'en_GB', ar: 'ar_IQ', ckb: 'ckb_IQ'})[l]), type: 'website', siteName: 'NORTHFORGE GROUP', images: [{ url: `${origin}${image}`, width: 1200, height: 630, alt: localizedTitle }] }, twitter: { card: 'summary_large_image', title: localizedTitle, description: localizedDescription, images: [`${origin}${image}`] }, ...(privatePage ? { robots: { index: false, follow: true } } : {}) };
}
