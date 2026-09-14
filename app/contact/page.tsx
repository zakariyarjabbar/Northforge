import { Suspense } from 'react';
import { InquiryFlow } from '@/components/inquiry';
import { Breadcrumb, TextLink } from '@/components/shared';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Discuss a project', 'Prepare your NORTHFORGE project inquiry. Choose the expertise and region, add a brief and include relevant project references.', '/contact/', undefined, true);
export default function ContactPage() { return <div className="wrap contact-page"><Breadcrumb items={[{ label: 'Contact' }]} /><div className="contact-layout"><aside className="contact-intro"><h1>Every project<br /> starts with<br /> a conversation.</h1><p>Tell us about the challenge.<br /> Let’s put the right thinking behind it.</p><div className="contact-aside-note"><span>Looking for your next role?</span><TextLink href="/careers/">Explore careers</TextLink></div></aside><Suspense fallback={<p className="loading-state">Loading your inquiry…</p>}><InquiryFlow/></Suspense></div></div>; }
