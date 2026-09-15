import type { MetadataRoute } from 'next';
import { expertise, projects } from '@/lib/content';
import { origin } from '@/lib/metadata';
import { locales, localePath } from '@/lib/i18n';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return ['/', '/projects/', '/expertise/', '/group/', '/global/', '/careers/', '/privacy/', '/website-information/', ...projects.map(p=>`/projects/${p.id}/`), ...expertise.map(e=>`/expertise/${e.id}/`)].flatMap(path => locales.map(locale => ({ url: `${origin}${localePath(path, locale)}`, alternates: { languages: Object.fromEntries(locales.map(l => [l, `${origin}${localePath(path, l)}`])) }, changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : .7 }))); }
