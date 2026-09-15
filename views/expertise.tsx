import { translator, type Locale } from '@/lib/i18n';
import Link from '@/components/locale-link';
import { expertise } from '@/lib/content';
import { Breadcrumb, ContactBand, Photo } from '@/components/shared';
import { ArrowUpRight } from '@/components/icons';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Our expertise', 'Four complementary disciplines. Explore our capabilities in transport, ports, industrial facilities, water and energy infrastructure.', '/expertise/');
export default function ExpertisePage({ locale = 'en' }: { locale?: Locale }) {
  const t = translator(locale); return <><div className="wrap"><Breadcrumb items={[{ label: 'Expertise' }]} /><div className="page-heading expertise-heading"><h1>{t("Built on")}<br /> {t(" understanding.")}</h1><p>{t("Four complementary disciplines.")}<br /> {t(" The capability to bring it all together.")}</p></div><div className="expertise-collection">{expertise.map((e,i) => <article className="expertise-feature" key={e.id}><Link href={`/expertise/${e.id}/`} className="expertise-feature-photo"><Photo id={e.image} alt={e.description} priority={i===0} sizes="(min-width: 800px) 60vw, 100vw" /></Link><div><h2>{t(e.name)}</h2><p>{t(e.intro)}</p><ul>{e.scopes.slice(0,3).map(s => <li key={s}>{t(s)}</li>)}</ul><Link className="text-link" href={`/expertise/${e.id}/`}>{t("Explore {expertise}", { expertise: t(e.short) })} <ArrowUpRight /></Link></div></article>)}</div></div><ContactBand title={t("Bring us your challenge.")} /></>; }
