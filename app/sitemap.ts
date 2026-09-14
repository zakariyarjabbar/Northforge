import type { MetadataRoute } from 'next';
import { expertise, projects } from '@/lib/content';
import { origin } from '@/lib/metadata';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return ['/', '/projects/', '/expertise/', '/group/', '/global/', '/careers/', '/privacy/', '/website-information/', ...projects.map(p=>`/projects/${p.id}/`), ...expertise.map(e=>`/expertise/${e.id}/`)].map(path=>({ url: `${origin}${path}`, changeFrequency: 'monthly', priority: path === '/' ? 1 : .7 })); }
