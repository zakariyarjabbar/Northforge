import { Breadcrumb } from '@/components/shared';
import { SavedProjects } from '@/components/saved-projects';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Saved projects', 'Your collection of NORTHFORGE projects, ready to explore and include in an inquiry.', '/saved/', undefined, true);
export default function SavedPage() { return <div className="wrap"><Breadcrumb items={[{ label: 'Saved projects' }]} /><div className="page-heading"><h1>A closer look.</h1><p>Your selected projects.<br /> A starting point for the conversation.</p></div><SavedProjects/></div>; }
