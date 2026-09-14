import { Suspense } from 'react';
import { ProjectExplorer } from '@/components/explorer';
import { Breadcrumb, ContactBand } from '@/components/shared';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Our projects', 'Explore NORTHFORGE transport, marine, industrial, water and energy projects around the world.', '/projects/');
export default function ProjectsPage() { return <><div className="wrap"><Breadcrumb items={[{ label: 'Projects' }]} /><div className="page-heading"><h1>Work that matters.</h1><p>Different places. Distinct challenges.<br /> The same considered approach.</p></div><Suspense fallback={<p className="loading-state">Loading projects…</p>}><ProjectExplorer /></Suspense></div><ContactBand /></>; }
