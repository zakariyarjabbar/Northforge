import { notFound } from 'next/navigation';
import { SiteRoot, siteMetadata } from '@/components/site-root';
import { isLocale } from '@/lib/i18n';
export const metadata = siteMetadata;
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === 'en') notFound();
  return <SiteRoot locale={locale}>{children}</SiteRoot>;
}
