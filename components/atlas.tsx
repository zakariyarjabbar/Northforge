'use client';
import { useLocale } from './locale-provider';
import Link from '@/components/locale-link';
import { useState } from 'react';
import { expertiseById, type Project } from '@/lib/content';
import { Photo } from './shared';
import { ArrowUpRight } from './icons';
import { SaveButton } from './workspace-ui';
export function ProjectAtlas({ projects, initialId }: { projects: Project[]; initialId?: string }) {
  const { t } = useLocale();
  const [selectedId, setSelectedId] = useState(initialId ?? projects[0]?.id);
  const selected = projects.find(p => p.id === selectedId) ?? projects[0];
  if (!selected) return null;
  return <div className="atlas"><div className="atlas-map" aria-label={t("Project locations")}><img src="/world-map.svg" alt="" width="1000" height="460" /><div className="map-equator" aria-hidden="true"><span>{t("EQUATOR")}</span></div>{projects.map(p => <button key={p.id} className={`map-marker ${p.id} ${selected.id === p.id ? 'selected' : ''}`} style={{ left: `${(p.coordinates[0] + 180) / 360 * 100}%`, top: `${(80 - p.coordinates[1]) / 140 * 100}%` }} aria-label={t("Select {project}, {country}", { project: t(p.name), country: t(p.country) })} aria-pressed={selected.id === p.id} onClick={() => setSelectedId(p.id)}><span /><span className="marker-tooltip">{t(p.country)}</span></button>)}<div className="map-caption"><span>{t("PROJECT ATLAS")}</span><span>{t("Locations: {count}", { count: projects.length })}</span></div></div><div className="atlas-content"><div className="atlas-selection" aria-live="polite"><div className="atlas-photo"><Photo id={selected.id} alt={selected.captions[0]} sizes="400px" /><SaveButton id={selected.id} /></div><div className="atlas-detail"><span>{t(selected.country)} · {t(expertiseById(selected.expertise).short)}</span><h3>{t(selected.name)}</h3><p>{t(selected.summary)}</p><Link className="text-link" href={`/projects/${selected.id}/`}>{t("Explore project ")}<ArrowUpRight size={18} /></Link></div></div></div><div className="atlas-project-list" aria-label={t("Choose a project")}>{projects.map(p => <button key={p.id} aria-pressed={selected.id === p.id} onClick={() => setSelectedId(p.id)}><span>{t(p.country)}</span><span>{t(p.name)}</span><ArrowUpRight size={16} /></button>)}</div></div>;
}
