'use client';
import Link from 'next/link';
import { projects } from '@/lib/content';
import { useWorkspace, saveDraft, getWorkspace } from '@/lib/storage';
import { ProjectCard } from './shared';
import { ArrowUpRight, Bookmark } from './icons';
export function SavedProjects() {
  const state = useWorkspace(); const saved = projects.filter(p => state.saved.includes(p.id));
  function includeReferences() { const current = getWorkspace(); saveDraft({ expertise: '', region: '', description: '', schedule: '', name: '', email: '', ...current.draft, references: current.saved }); }
  if (!state.ready) return <div className="loading-state" role="status">Loading your saved projects…</div>;
  return saved.length ? <><div className="saved-toolbar"><p>{saved.length} {saved.length===1 ? 'project' : 'projects'} in your collection</p><Link className="button" href="/contact/" onClick={includeReferences}>Include in an inquiry <ArrowUpRight size={18}/></Link></div><div className="project-grid saved-grid">{saved.map(p => <ProjectCard project={p} key={p.id}/>)}</div><p className="saved-note">Saved projects stay in this browser, ready for your next visit.</p></> : <div className="empty-state saved-empty"><Bookmark size={40}/><h2>Your next connection<br /> starts with a little inspiration.</h2><p>Save projects as you explore. Bring them together here and use them as references for your inquiry.</p><Link className="button" href="/projects/">Explore our projects <ArrowUpRight size={18}/></Link></div>;
}
