import Link from 'next/link';
import { expertise } from '@/lib/content';
import { Breadcrumb, ContactBand, Photo } from '@/components/shared';
import { ArrowUpRight } from '@/components/icons';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Our expertise', 'Four complementary disciplines. Explore our capabilities in transport, ports, industrial facilities, water and energy infrastructure.', '/expertise/');
export default function ExpertisePage() { return <><div className="wrap"><Breadcrumb items={[{ label: 'Expertise' }]} /><div className="page-heading expertise-heading"><h1>Built on<br /> understanding.</h1><p>Four complementary disciplines.<br /> The capability to bring it all together.</p></div><div className="expertise-collection">{expertise.map((e,i) => <article className="expertise-feature" key={e.id}><Link href={`/expertise/${e.id}/`} className="expertise-feature-photo"><Photo id={e.image} alt={e.description} priority={i===0} sizes="(min-width: 800px) 60vw, 100vw" /></Link><div><h2>{e.name}</h2><p>{e.intro}</p><ul>{e.scopes.slice(0,3).map(s => <li key={s}>{s}</li>)}</ul><Link className="text-link" href={`/expertise/${e.id}/`}>Explore {e.short.toLowerCase()} <ArrowUpRight /></Link></div></article>)}</div></div><ContactBand title="Bring us your challenge." /></>; }
