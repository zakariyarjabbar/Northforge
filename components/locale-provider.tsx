'use client';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { translator, type Locale } from '@/lib/i18n';

const LocaleContext = createContext<Locale>('en');
export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  useEffect(() => {
    try { localStorage.setItem('northforge:v1:language', locale); } catch { /* URL remains the source of truth. */ }
  }, [locale]);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const locale = useContext(LocaleContext);
  const t = useMemo(() => translator(locale), [locale]);
  return { locale, t };
}
