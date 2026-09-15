'use client';
import { useLocale } from './locale-provider';
import { useEffect } from 'react';
import { Bookmark, Check, Close } from './icons';
import { clearNotice, setProjectSaved, useWorkspace } from '@/lib/storage';
export function SaveButton({ id, full = false }: { id: string; full?: boolean }) {
  const { t } = useLocale();
  const state = useWorkspace(); const saved = state.saved.includes(id);
  return <button type="button" className={full ? 'button button-outline' : 'save-button'} aria-pressed={saved} aria-label={t(saved ? 'Remove from saved projects' : 'Save project')} onClick={() => setProjectSaved(id, !saved)}><Bookmark filled={saved} />{full && <span>{t(saved ? 'Project saved' : 'Save project')}</span>}</button>;
}
export function Notifications() {
  const { t } = useLocale();
  const { notice, persistence } = useWorkspace();
  useEffect(() => { if (!notice || !persistence) return; const timer = setTimeout(clearNotice, 4000); return () => clearTimeout(timer); }, [notice, persistence]);
  return <div className={`toast ${notice ? 'is-visible' : ''}`} role="status" aria-live="polite">{notice && <><Check size={18} /><span>{t(notice)}</span><button className="icon-button" aria-label={t("Dismiss notification")} onClick={clearNotice}><Close size={18} /></button></>}</div>;
}
