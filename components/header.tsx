'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { Brand } from './brand';
import { ArrowUpRight, Bookmark, Close } from './icons';
import { useWorkspace } from '@/lib/storage';
const links = [['Projects', '/projects/'], ['Expertise', '/expertise/'], ['The Group', '/group/'], ['Global Presence', '/global/'], ['Contact', '/contact/']];
export function Header() {
  const pathname = usePathname(); const { saved } = useWorkspace(); const dialog = useRef<HTMLDialogElement>(null);
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><Link className="brand-link" href="/" aria-label="NORTHFORGE GROUP home"><Brand /></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.startsWith(href.slice(0, -1)) ? 'page' : undefined}>{label}</Link>)}</nav><div className="header-actions"><Link className="saved-link" href="/saved/" aria-label={`Saved projects (${saved.length})`}><Bookmark /><span>{saved.length || ''}</span></Link><Link href="/contact/" className="header-cta">Discuss a project <ArrowUpRight size={17} /></Link><button className="menu-toggle" aria-label="Open navigation" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><span /><span /></button></div></header><dialog ref={dialog} className="mobile-menu" aria-label="Navigation"><div className="mobile-menu-top"><Brand /><button className="icon-button" aria-label="Close navigation" onClick={() => dialog.current?.close()}><Close /></button></div><nav aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => dialog.current?.close()}>{label}<ArrowUpRight /></Link>)}<Link href="/careers/" onClick={() => dialog.current?.close()}>Careers<ArrowUpRight /></Link><Link href="/saved/" onClick={() => dialog.current?.close()}>Saved projects ({saved.length})<Bookmark /></Link></nav><p>Engineering what matters.</p></dialog></>;
}
