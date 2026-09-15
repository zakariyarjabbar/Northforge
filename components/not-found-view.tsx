'use client';
import { useLocale } from './locale-provider';
import Link from '@/components/locale-link';
import { ArrowUpRight } from '@/components/icons';
export function NotFoundView() {
  const { t } = useLocale(); return <div className="wrap not-found"><span>404</span><h1>{t("This route ends here.")}</h1><p>{t("There’s plenty more to explore. Return to the group or find a project that interests you.")}</p><div className="record-actions"><Link className="button" href="/">{t("Back to NORTHFORGE ")}<ArrowUpRight size={18}/></Link><Link className="button button-outline" href="/projects/">{t("Explore projects")}</Link></div></div>; }
