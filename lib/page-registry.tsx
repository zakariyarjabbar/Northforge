import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Home, { metadata as homeMeta } from '@/views/home';
import Projects, { metadata as projectsMeta } from '@/views/projects';
import Expertise, { metadata as expertiseMeta } from '@/views/expertise';
import Group, { metadata as groupMeta } from '@/views/group';
import Global, { metadata as globalMeta } from '@/views/global';
import Careers, { metadata as careersMeta } from '@/views/careers';
import Contact, { metadata as contactMeta } from '@/views/contact';
import Saved, { metadata as savedMeta } from '@/views/saved';
import Information, { metadata as informationMeta } from '@/views/website-information';
import Privacy, { metadata as privacyMeta } from '@/views/privacy';
import ProjectDetail from '@/views/project-detail';
import ExpertiseDetail from '@/views/expertise-detail';
import { projects, expertise } from './content';
import { pageMetadata } from './metadata';
import type { Locale } from './i18n';

const pages = {
  '': [Home, homeMeta], projects: [Projects, projectsMeta], expertise: [Expertise, expertiseMeta],
  group: [Group, groupMeta], global: [Global, globalMeta], careers: [Careers, careersMeta],
  contact: [Contact, contactMeta], saved: [Saved, savedMeta], privacy: [Privacy, privacyMeta],
  'website-information': [Information, informationMeta], 'about-this-demo': [Information, informationMeta],
} as const;
export const contentPaths = [...Object.keys(pages), ...projects.map(p => `projects/${p.id}`), ...expertise.map(e => `expertise/${e.id}`)];
export function localizedPageMetadata(path: string, locale: Locale): Metadata {
  const project = path.startsWith('projects/') ? projects.find(p => path === `projects/${p.id}`) : undefined;
  if (project) return pageMetadata(project.name, project.summary, `/${path}/`, `/og/${project.id}.jpg`, false, locale);
  const capability = path.startsWith('expertise/') ? expertise.find(e => path === `expertise/${e.id}`) : undefined;
  if (capability) return pageMetadata(capability.name, capability.description, `/${path}/`, `/og/${capability.image}.jpg`, false, locale);
  const item = pages[path as keyof typeof pages];
  if (!item) return {};
  return pageMetadata(String(item[1].title), String(item[1].description), path === 'about-this-demo' ? '/website-information/' : path ? `/${path}/` : '/', undefined, ['saved', 'contact'].includes(path), locale);
}
export function LocalizedPage({ path, locale }: { path: string; locale: Locale }) {
  if (path.startsWith('projects/') && projects.some(p => path === `projects/${p.id}`)) return <ProjectDetail locale={locale} params={Promise.resolve({ slug: path.split('/')[1] })} />;
  if (path.startsWith('expertise/') && expertise.some(e => path === `expertise/${e.id}`)) return <ExpertiseDetail locale={locale} params={Promise.resolve({ slug: path.split('/')[1] })} />;
  const item = pages[path as keyof typeof pages];
  if (!item) notFound();
  const View = item[0];
  return <View locale={locale} />;
}
