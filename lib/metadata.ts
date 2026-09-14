import type { Metadata } from 'next';
import { deploymentOrigin } from './site-config';
export const origin = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'production' ? deploymentOrigin : 'http://localhost:3016')).replace(/\/$/, '');
export function pageMetadata(title: string, description: string, path: string, image = '/og/home.jpg', privatePage = false): Metadata {
  return { title, description, alternates: { canonical: `${origin}${path}` }, openGraph: { title: `${title} | NORTHFORGE GROUP`, description, url: `${origin}${path}`, type: 'website', siteName: 'NORTHFORGE GROUP', images: [{ url: `${origin}${image}`, width: 1200, height: 630, alt: title }] }, twitter: { card: 'summary_large_image', title, description, images: [`${origin}${image}`] }, ...(privatePage ? { robots: { index: false, follow: true } } : {}) };
}
