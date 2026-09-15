'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, Globe } from './icons';
import { useLocale } from './locale-provider';
import { languageNames, locales, localePath, languageDirections } from '@/lib/i18n';

export function LanguageSelector() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [suffix, setSuffix] = useState('');
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!panel.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);
  function focusOption(index: number) { panel.current?.querySelectorAll<HTMLAnchorElement>('[data-language]')[index]?.focus(); }
  return <div className="language-selector" ref={panel} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={event => {
    if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); event.stopPropagation(); }
    if (open && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const options = Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>('[data-language]') ?? []);
      const current = options.indexOf(document.activeElement as HTMLAnchorElement);
      focusOption(event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (current + (event.key === 'ArrowUp' ? -1 : 1) + 3) % 3);
    }
  }}>
    <button ref={trigger} className={`language-trigger ${open ? 'is-open' : ''}`} aria-label={t('Choose language')} aria-expanded={open} aria-controls="language-options" onClick={() => { setSuffix(window.location.search + window.location.hash); setOpen(!open); }} onKeyDown={event => {
      if (!open && ['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); setSuffix(window.location.search + window.location.hash); setOpen(true); requestAnimationFrame(() => focusOption(event.key === 'ArrowUp' ? 2 : 0)); }
    }}><Globe size={18} /><span lang={locale} dir={languageDirections[locale]}>{languageNames[locale]}</span><svg className="language-chevron" viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg></button>
    <div id="language-options" className="language-panel" hidden={!open}>
      <p>{t('Choose language')}</p>
      <nav aria-label={t('Website language')}>{locales.map(value => <a key={value} data-language={value} href={localePath(pathname, value) + suffix} hrefLang={value} aria-current={value === locale ? 'true' : undefined} onClick={event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        const target = localePath(window.location.pathname, value) + window.location.search + window.location.hash;
        try { localStorage.setItem('northforge:v1:language', value); } catch { /* Switching also works without storage. */ }
        if (value === locale) { setOpen(false); trigger.current?.focus(); } else window.location.assign(target);
      }}><span className="language-native" lang={value} dir={languageDirections[value]}>{languageNames[value]}</span><span className="language-code" aria-hidden="true">{value === 'ckb' ? 'KU' : value.toUpperCase()}</span>{value === locale && <Check size={16} />}</a>)}</nav>
    </div>
  </div>;
}
