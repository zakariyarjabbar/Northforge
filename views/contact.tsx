import { translator, type Locale } from '@/lib/i18n';
import { Suspense } from 'react';
import { InquiryFlow } from '@/components/inquiry';
import { Breadcrumb, TextLink } from '@/components/shared';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Discuss a project', 'Prepare your NORTHFORGE project inquiry. Choose the expertise and region, add a brief and include relevant project references.', '/contact/', undefined, true);
export default function ContactPage({ locale = 'en' }: { locale?: Locale }) {
  const t = translator(locale); return <div className="wrap contact-page"><Breadcrumb items={[{ label: 'Contact' }]} /><div className="contact-layout"><aside className="contact-intro"><h1>{t("Every project")}<br /> {t(" starts with")}<br /> {t(" a conversation.")}</h1><p>{t("Tell us about the challenge.")}<br /> {t(" Let’s put the right thinking behind it.")}</p><div className="contact-aside-note"><span>{t("Looking for your next role?")}</span><TextLink href="/careers/">{t("Explore careers")}</TextLink></div></aside><Suspense fallback={<p className="loading-state">{t("Loading your inquiry…")}</p>}><InquiryFlow/></Suspense></div></div>; }
