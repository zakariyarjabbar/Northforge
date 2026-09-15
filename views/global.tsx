import { translator, type Locale } from '@/lib/i18n';
import { Suspense } from 'react';
import Link from '@/components/locale-link';
import { ProjectExplorer } from '@/components/explorer';
import { Breadcrumb, ContactBand } from '@/components/shared';
import { regions } from '@/lib/content';
import { ArrowUpRight } from '@/components/icons';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Global presence', 'Explore the geography of NORTHFORGE projects and find the right regional route for your inquiry.', '/global/');
export default function GlobalPage({ locale = 'en' }: { locale?: Locale }) {
  const t = translator(locale); return <><div className="wrap"><Breadcrumb items={[{ label: 'Global Presence' }]} /><div className="page-heading"><h1>{t("A world of")}<br /> {t(" shared experience.")}</h1><p>{t("International capability.")}<br /> {t(" An understanding of every place.")}</p></div><Suspense fallback={<p className="loading-state">{t("Loading project atlas…")}</p>}><ProjectExplorer global /></Suspense><section className="regional-routing"><div><h2>{t("Start in the")}<br /> {t(" right place.")}</h2><p>{t("Choose a region to prepare your project inquiry.")}</p></div><div className="region-links">{regions.map(r => <Link key={r.id} href={`/contact/?region=${r.id}`}>{t(r.name)}<ArrowUpRight size={18} /></Link>)}</div></section></div><ContactBand /></>; }
