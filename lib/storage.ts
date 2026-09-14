'use client';

import { useSyncExternalStore } from 'react';
import { projects, expertise, regions, roles } from './content';
export const NAMESPACE = 'northforge:v1:';
const KEY = `${NAMESPACE}workspace`;
export type InquiryDraft = { expertise: string; region: string; description: string; schedule: string; name: string; email: string; references: string[]; };
export type Inquiry = InquiryDraft & { id: string; createdAt: string; updatedAt: string; };
export type CareerInterest = { role: string; name: string; email: string; note: string; savedAt: string; };
type Data = { saved: string[]; draft: InquiryDraft | null; inquiries: Inquiry[]; careers: CareerInterest[]; };
type Snapshot = Data & { ready: boolean; persistence: boolean; notice: string; };
const blankData: Data = { saved: [], draft: null, inquiries: [], careers: [] };
const server: Snapshot = { ...blankData, ready: false, persistence: true, notice: '' };
let snapshot: Snapshot = server;
let initialized = false;
const listeners = new Set<() => void>();
const projectIds = new Set(projects.map(p => p.id));
const text = (v: unknown, max = 300) => typeof v === 'string' ? v.slice(0, max) : '';
const ids = (v: unknown) => Array.isArray(v) ? [...new Set(v.filter((id): id is string => typeof id === 'string' && projectIds.has(id)))] : [];
const obj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
function draft(v: unknown): InquiryDraft | null {
  if (!obj(v)) return null;
  return { expertise: expertise.some(e => e.id === v.expertise) ? String(v.expertise) : '', region: regions.some(r => r.id === v.region) ? String(v.region) : '', description: text(v.description, 5000), schedule: text(v.schedule, 200), name: text(v.name, 160), email: text(v.email, 254), references: ids(v.references) };
}
function validate(v: unknown): Data {
  if (!obj(v)) return { ...blankData };
  const inquiries: Inquiry[] = [];
  if (Array.isArray(v.inquiries)) for (const entry of v.inquiries.slice(-100)) {
    const d = draft(entry);
    if (d && obj(entry) && typeof entry.id === 'string' && /^NF-[A-Z0-9-]{4,80}$/.test(entry.id) && typeof entry.createdAt === 'string' && Number.isFinite(Date.parse(entry.createdAt))) {
      if (!inquiries.some(i => i.id === entry.id)) inquiries.push({ ...d, id: entry.id, createdAt: entry.createdAt, updatedAt: text(entry.updatedAt) || entry.createdAt });
    }
  }
  const careers: CareerInterest[] = [];
  if (Array.isArray(v.careers)) for (const c of v.careers.slice(-20)) if (obj(c) && roles.some(r => r.id === c.role)) {
    if (!careers.some(entry => entry.role === c.role)) careers.push({ role: String(c.role), name: text(c.name, 160), email: text(c.email, 254), note: text(c.note, 3000), savedAt: text(c.savedAt) });
  }
  return { saved: ids(v.saved), draft: draft(v.draft), inquiries, careers };
}
function read(): Data {
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return { ...blankData };
  try { return validate(JSON.parse(raw)); } catch { return { ...blankData }; }
}
function emit() { listeners.forEach(fn => fn()); }
function initialize() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  try { snapshot = { ...read(), ready: true, persistence: true, notice: '' }; }
  catch { snapshot = { ...blankData, ready: true, persistence: false, notice: 'Browser storage is unavailable. Changes will last for this visit.' }; }
}
function onStorage(event: StorageEvent) {
  if (event.key !== KEY && event.key !== null) return;
  try { snapshot = { ...read(), ready: true, persistence: true, notice: snapshot.notice }; emit(); }
  catch { /* Keep the current session available if access changes. */ }
}
function subscribe(fn: () => void) {
  initialize();
  if (!listeners.size) window.addEventListener('storage', onStorage);
  listeners.add(fn);
  return () => { listeners.delete(fn); if (!listeners.size) window.removeEventListener('storage', onStorage); };
}
function getSnapshot() { initialize(); return snapshot; }
export function useWorkspace() { return useSyncExternalStore(subscribe, getSnapshot, () => server); }
export function getWorkspace() { initialize(); return snapshot; }
function update(action: (state: Data) => Data, notice = '') {
  initialize();
  let current: Data = snapshot;
  let persistence = snapshot.persistence;
  if (persistence) try { current = read(); } catch { persistence = false; }
  const data = validate(action(current));
  if (persistence) try { window.localStorage.setItem(KEY, JSON.stringify(data)); } catch { persistence = false; }
  snapshot = { ...data, ready: true, persistence, notice: persistence ? notice : 'Browser storage is unavailable. Changes will last for this visit.' };
  emit();
}
export function setProjectSaved(id: string, saved: boolean) {
  if (!projectIds.has(id)) throw new Error('Unknown project.');
  update(s => ({ ...s, saved: saved ? [...new Set([...s.saved, id])] : s.saved.filter(x => x !== id) }), saved ? 'Project saved.' : 'Project removed from saved projects.');
}
export function saveDraft(value: InquiryDraft) { update(s => ({ ...s, draft: value })); }
export function clearDraft() { update(s => ({ ...s, draft: null })); }
export function saveInquiry(value: InquiryDraft, existingId?: string) {
  const now = new Date().toISOString();
  let result: Inquiry | undefined;
  update(s => {
    const match = existingId ? s.inquiries.find(i => i.id === existingId) : s.inquiries.find(i => JSON.stringify(draft(i)) === JSON.stringify(draft(value)));
    result = { ...value, id: match?.id ?? `NF-${crypto.randomUUID().slice(0, 13).toUpperCase()}`, createdAt: match?.createdAt ?? now, updatedAt: now };
    return { ...s, draft: null, inquiries: [...s.inquiries.filter(i => i.id !== result!.id), result!] };
  }, 'Inquiry saved.');
  return result!;
}
export function removeInquiry(id: string) { update(s => ({ ...s, inquiries: s.inquiries.filter(i => i.id !== id) }), 'Inquiry removed.'); }
export function saveCareer(value: CareerInterest, announce = true) { update(s => ({ ...s, careers: [...s.careers.filter(c => c.role !== value.role), value] }), announce ? 'Career profile saved.' : ''); }
export function removeCareer(role: string) { update(s => ({ ...s, careers: s.careers.filter(c => c.role !== role) }), 'Career profile removed.'); }
export function clearNotice() { snapshot = { ...snapshot, notice: '' }; emit(); }
export function resetWorkspace() {
  initialize();
  let persistence = snapshot.persistence;
  try { const keys = Object.keys(window.localStorage).filter(k => k.startsWith(NAMESPACE)); keys.forEach(k => window.localStorage.removeItem(k)); }
  catch { persistence = false; }
  try { Object.keys(window.sessionStorage).filter(k => k.startsWith(NAMESPACE)).forEach(k => window.sessionStorage.removeItem(k)); } catch { /* Current-page state is still reset. */ }
  snapshot = { ...blankData, ready: true, persistence, notice: 'Your NORTHFORGE data has been reset.' }; emit();
}
export function downloadText(filename: string, content: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([content], { type: `${type};charset=utf-8` }));
  const link = document.createElement('a'); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
}
