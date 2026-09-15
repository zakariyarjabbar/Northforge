import { translator, type Locale } from '@/lib/i18n';
import { Breadcrumb } from '@/components/shared';
import { SavedProjects } from '@/components/saved-projects';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Saved projects', 'Your collection of NORTHFORGE projects, ready to explore and include in an inquiry.', '/saved/', undefined, true);
export default function SavedPage({ locale = 'en' }: { locale?: Locale }) {
  const t = translator(locale); return <div className="wrap"><Breadcrumb items={[{ label: 'Saved projects' }]} /><div className="page-heading"><h1>{t("A closer look.")}</h1><p>{t("Your selected projects.")}<br /> {t(" A starting point for the conversation.")}</p></div><SavedProjects/></div>; }
