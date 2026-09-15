import { notFound } from 'next/navigation';
import { contentPaths, LocalizedPage, localizedPageMetadata } from '@/lib/page-registry';
import { isLocale } from '@/lib/i18n';
type Params = Promise<{ locale: string; path?: string[] }>;
export const dynamicParams = false;
export function generateStaticParams() {
  return ['ar', 'ckb'].flatMap(locale => contentPaths.map(path => ({ locale, path: path ? path.split('/') : [] })));
}
export async function generateMetadata({ params }: { params: Params }) {
  const { locale, path = [] } = await params;
  return isLocale(locale) ? localizedPageMetadata(path.join('/'), locale) : {};
}
export default async function Page({ params }: { params: Params }) {
  const { locale, path = [] } = await params;
  if (!isLocale(locale)) notFound();
  return <LocalizedPage path={path.join('/')} locale={locale} />;
}
