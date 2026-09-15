import { translator, type Locale } from '@/lib/i18n';
import { Suspense } from 'react';
import { ProjectExplorer } from '@/components/explorer';
import { Breadcrumb, ContactBand } from '@/components/shared';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Our projects', 'Explore NORTHFORGE transport, marine, industrial, water and energy projects around the world.', '/projects/');
export default function ProjectsPage({ locale = 'en' }: { locale?: Locale }) {
  const t = translator(locale); return <><div className="wrap"><Breadcrumb items={[{ label: 'Projects' }]} /><div className="page-heading"><h1>{t("Work that matters.")}</h1><p>{t("Different places. Distinct challenges.")}<br /> {t(" The same considered approach.")}</p></div><Suspense fallback={<p className="loading-state">{t("Loading projects…")}</p>}><ProjectExplorer /></Suspense></div><ContactBand /></>; }
