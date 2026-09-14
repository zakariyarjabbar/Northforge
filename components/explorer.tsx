'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { expertise, projects, regions } from '@/lib/content';
import { ProjectCard } from './shared';
import { ProjectAtlas } from './atlas';
import { Arrow, Close, Globe, Search } from './icons';
import { useEffect } from 'react';
type ToolContext = { registerTool: (tool: { name: string; title: string; description: string; inputSchema: object; annotations: object; execute: (input: unknown) => unknown }, options: { signal: AbortSignal }) => void | Promise<void> };
export function ProjectExplorer({ global = false }: { global?: boolean }) {
  const params = useSearchParams(); const router = useRouter();
  const discipline = expertise.some(e => e.id === params.get('expertise')) ? params.get('expertise')! : '';
  const region = regions.some(r => r.id === params.get('region')) ? params.get('region')! : '';
  const search = params.get('q')?.slice(0, 100) ?? '';
  const map = global || params.get('view') === 'atlas';
  const filtered = projects.filter(p => (!discipline || p.expertise === discipline) && (!region || p.region === region) && (!search || `${p.name} ${p.country} ${p.location} ${p.summary} ${p.scope.join(' ')} ${expertise.find(e=>e.id===p.expertise)?.name}`.toLowerCase().includes(search.toLowerCase())));
  useEffect(() => { try { sessionStorage.setItem('northforge:v1:project-location', `${global ? '/global/' : '/projects/'}${params.size ? `?${params}` : ''}`); } catch { /* Filters remain available in the URL. */ } }, [params, global]);
  function change(key: string, value: string) { const next = new URLSearchParams(params.toString()); if (value) next.set(key, value); else next.delete(key); router.push(`${global ? '/global/' : '/projects/'}${next.size ? `?${next}` : ''}`, { scroll: false }); }
  function reset() { const next = map && !global ? '?view=atlas' : ''; router.push(`${global ? '/global/' : '/projects/'}${next}`, { scroll: false }); }
  useEffect(() => {
    const context = (document as Document & { modelContext?: ToolContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try { void Promise.resolve(context.registerTool({ name: 'filter_northforge_projects', title: 'Filter projects', description: 'Set public expertise, region and keyword filters in the project explorer. Returns matching project IDs and navigates to the matching results.', inputSchema: { type: 'object', properties: { expertise: { type: 'string', enum: ['', ...expertise.map(e => e.id)] }, region: { type: 'string', enum: ['', ...regions.map(r => r.id)] }, keyword: { type: 'string', maxLength: 100 } }, additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) {
      if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Expected filter object.');
      const q = input as Record<string, unknown>; if (Object.keys(q).some(k => !['expertise', 'region', 'keyword'].includes(k))) throw new Error('Unknown filter.');
      if (q.expertise !== undefined && (typeof q.expertise !== 'string' || q.expertise !== '' && !expertise.some(e => e.id === q.expertise))) throw new Error('Unknown expertise.');
      if (q.region !== undefined && (typeof q.region !== 'string' || q.region !== '' && !regions.some(r => r.id === q.region))) throw new Error('Unknown region.');
      if (q.keyword !== undefined && (typeof q.keyword !== 'string' || q.keyword.length > 100)) throw new Error('Keyword must be up to 100 characters.');
      const next = new URLSearchParams(); if (q.expertise) next.set('expertise', String(q.expertise)); if (q.region) next.set('region', String(q.region)); if (q.keyword) next.set('q', String(q.keyword));
      const matching = projects.filter(p => (!q.expertise || p.expertise === q.expertise) && (!q.region || p.region === q.region) && (!q.keyword || `${p.name} ${p.country} ${p.location} ${p.summary} ${p.scope.join(' ')} ${expertise.find(e=>e.id===p.expertise)?.name}`.toLowerCase().includes(String(q.keyword).toLowerCase())));
      router.push(`${global ? '/global/' : '/projects/'}?${next}`, { scroll: false }); return { projectIds: matching.map(p => p.id), count: matching.length };
    } }, { signal: lifecycle.signal })).catch(() => {}); } catch { /* Optional browser API; all controls remain available. */ }
    return () => lifecycle.abort();
  }, [router, global]);
  return <div className="project-explorer"><div className="explorer-controls"><div className="filter-field"><label htmlFor="expertise-filter">Expertise</label><select id="expertise-filter" value={discipline} onChange={e => change('expertise', e.target.value)}><option value="">All expertise</option>{expertise.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}</select></div><div className="filter-field"><label htmlFor="region-filter">Region</label><select id="region-filter" value={region} onChange={e => change('region', e.target.value)}><option value="">All regions</option>{regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></div><form className="search-form" key={search} onSubmit={e => { e.preventDefault(); change('q', String(new FormData(e.currentTarget).get('q') ?? '').trim()); }}><label htmlFor="project-search">Search projects</label><div><input id="project-search" name="q" type="search" placeholder="Project, country or keyword" defaultValue={search} maxLength={100} /><button aria-label="Search projects" type="submit"><Search /></button></div></form></div><div className="results-bar"><p role="status" aria-live="polite"><strong>{filtered.length.toString().padStart(2, '0')}</strong> {filtered.length === 1 ? 'project' : 'projects'}{discipline || region || search ? ' found' : ' across our group'}</p><div className="results-tools">{(discipline || region || search) && <button className="clear-filters" onClick={reset}>Reset filters <Close size={15} /></button>}{!global && <div className="view-switch" aria-label="Project view"><button aria-pressed={!map} onClick={() => change('view', '')}><span className="grid-icon" aria-hidden="true" /> Grid</button><button aria-pressed={map} onClick={() => change('view', 'atlas')}><Globe size={16} /> Atlas</button></div>}</div></div>{(discipline || region || search) && <div className="active-filters" aria-label="Active filters">{discipline && <button onClick={() => change('expertise', '')}>{expertise.find(e => e.id === discipline)?.short}<Close size={14} /></button>}{region && <button onClick={() => change('region', '')}>{regions.find(r => r.id === region)?.name}<Close size={14} /></button>}{search && <button onClick={() => change('q', '')}>“{search}”<Close size={14} /></button>}</div>}{!filtered.length ? <div className="empty-state"><h2>No projects match those filters.</h2><p>Try a different region or expertise, or return to the full collection.</p><button onClick={reset} className="button">Show all projects <Arrow /></button></div> : map ? <ProjectAtlas projects={filtered} /> : <div className="project-grid">{filtered.map(p => <ProjectCard key={p.id} project={p} />)}</div>}</div>;
}
