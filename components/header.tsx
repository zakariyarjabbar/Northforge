'use client';
import { useLocale } from './locale-provider';
import Link from '@/components/locale-link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { Brand } from './brand';
import { ArrowUpRight, Bookmark, Close } from './icons';
import { LanguageSelector } from './language-selector';
import { withoutLocale } from '@/lib/i18n';
import { useWorkspace } from '@/lib/storage';
const links = [['Projects', '/projects/'], ['Expertise', '/expertise/'], ['The Group', '/group/'], ['Global Presence', '/global/'], ['Contact', '/contact/']];
export function Header() {
  const { t } = useLocale();
  const pathname = withoutLocale(usePathname()); const { saved } = useWorkspace(); const dialog = useRef<HTMLDialogElement>(null);
  return <><a className="skip-link" href="#main">{t("Skip to content")}</a><header className="site-header"><Link className="brand-link" href="/" aria-label={t("NORTHFORGE GROUP home")}><Brand /></Link><nav className="desktop-nav" aria-label={t("Main navigation")}>{links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.startsWith(href.slice(0, -1)) ? 'page' : undefined}>{t(label)}</Link>)}</nav><div className="header-actions"><LanguageSelector /><Link className="saved-link" href="/saved/" aria-label={t("Saved projects ({count})", { count: saved.length })}><Bookmark /><span>{saved.length || ''}</span></Link><Link href="/contact/" className="header-cta">{t("Discuss a project ")}<ArrowUpRight size={17} /></Link><button className="menu-toggle" aria-label={t("Open navigation")} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><span /><span /></button></div></header><dialog ref={dialog} className="mobile-menu" aria-label={t("Navigation")}><div className="mobile-menu-top"><Brand /><button className="icon-button" aria-label={t("Close navigation")} onClick={() => dialog.current?.close()}><Close /></button></div><nav aria-label={t("Mobile navigation")}>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => dialog.current?.close()}>{t(label)}<ArrowUpRight /></Link>)}<Link href="/careers/" onClick={() => dialog.current?.close()}>{t("Careers")}<ArrowUpRight /></Link><Link href="/saved/" onClick={() => dialog.current?.close()}>{t("Saved projects ({count})", { count: saved.length })}<Bookmark /></Link></nav><p>{t("Engineering what matters.")}</p></dialog></>;
}
