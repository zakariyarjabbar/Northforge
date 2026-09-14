import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/header';
import { Footer } from '@/components/shared';
import { Notifications } from '@/components/workspace-ui';
import { origin } from '@/lib/metadata';
import './globals.css';
import './pages.css';
const manrope = localFont({ src: '../public/fonts/manrope-latin.woff2', variable: '--font-manrope', display: 'swap', weight: '400 700' });
export const metadata: Metadata = { metadataBase: new URL(origin), title: { default: 'NORTHFORGE GROUP — Built for the world ahead.', template: '%s | NORTHFORGE GROUP' }, description: 'Engineering and construction for the connections that matter. Explore NORTHFORGE projects in transport, marine, industrial, water and energy infrastructure.', icons: { icon: '/favicon.svg' } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={manrope.variable}><body><script type="application/json" id="design-contract" dangerouslySetInnerHTML={{ __html: JSON.stringify({ thesis: 'A structural engineering annual presented as an expansive photographic field, with confident wayfinding and coordinated geographic exploration.', world: 'Graphite, ivory, vivid signal yellow. Manrope. Unframed image-led layouts, strong rules, square controls.', story: 'Understand the group, find relevant expertise, inspect a project, prepare an inquiry.', firstViewport: 'Persistent readable navigation above a fjord photograph. Large left-aligned headline, immediate project link, right-edge project identification.', form: 'Engineering annual and geographic index; candidate 6; seed 1a91ef0d. Creative decisions delegated by user; direct implementation.', finish: 'unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance' }) }} /><Header /><main id="main">{children}</main><Footer /><Notifications /></body></html>;
}
