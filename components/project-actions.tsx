'use client';
import Link from 'next/link';
import { Arrow } from './icons';
export function ProjectBack() {
  return <Link className="project-back" href="/projects/" onClick={e => { try { const previous = sessionStorage.getItem('northforge:v1:project-location'); if (previous && /^\/(projects|global)\/(?:\?[^#]*)?$/.test(previous)) { e.preventDefault(); window.location.assign(previous); } } catch { /* The ordinary collection link remains available. */ } }}><Arrow size={18} style={{ transform: 'rotate(180deg)' }} /> Back to projects</Link>;
}
export function PrintButton() { return <button className="text-link print-control" onClick={() => window.print()}>Print project summary <Arrow size={18} /></button>; }
export function ProjectCollectionLink() { return <Link href="/projects/" className="text-link">Project collection<Arrow /></Link>; }
