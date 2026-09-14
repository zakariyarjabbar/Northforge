import { Suspense } from 'react';
import Link from 'next/link';
import { ProjectExplorer } from '@/components/explorer';
import { Breadcrumb, ContactBand } from '@/components/shared';
import { regions } from '@/lib/content';
import { ArrowUpRight } from '@/components/icons';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Global presence', 'Explore the geography of NORTHFORGE projects and find the right regional route for your inquiry.', '/global/');
export default function GlobalPage() { return <><div className="wrap"><Breadcrumb items={[{ label: 'Global Presence' }]} /><div className="page-heading"><h1>A world of<br /> shared experience.</h1><p>International capability.<br /> An understanding of every place.</p></div><Suspense fallback={<p className="loading-state">Loading project atlas…</p>}><ProjectExplorer global /></Suspense><section className="regional-routing"><div><h2>Start in the<br /> right place.</h2><p>Choose a region to prepare your project inquiry.</p></div><div className="region-links">{regions.map(r => <Link key={r.id} href={`/contact/?region=${r.id}`}>{r.name}<ArrowUpRight size={18} /></Link>)}</div></section></div><ContactBand /></>; }
