'use client';
import { useLocale } from './locale-provider';
import Link from '@/components/locale-link';
import { localePath, withoutLocale } from '@/lib/i18n';
import { Arrow } from './icons';
export function ProjectBack() {
  const { t, locale } = useLocale();
  return <Link className="project-back" href="/projects/" onClick={e => { try { const previous = sessionStorage.getItem('northforge:v1:project-location'); if (previous && /^\/(projects|global)\/(?:\?[^#]*)?$/.test(withoutLocale(previous))) { e.preventDefault(); window.location.assign(localePath(previous, locale)); } } catch { /* The ordinary collection link remains available. */ } }}><Arrow size={18} style={{ transform: 'rotate(180deg)' }} /> {t(" Back to projects")}</Link>;
}
export function PrintButton() {
  const { t } = useLocale(); return <button className="text-link print-control" onClick={() => window.print()}>{t("Print project summary ")}<Arrow size={18} /></button>; }
export function ProjectCollectionLink() {
  const { t } = useLocale(); return <Link href="/projects/" className="text-link">{t("Project collection")}<Arrow /></Link>; }
