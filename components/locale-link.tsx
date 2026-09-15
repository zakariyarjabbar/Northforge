'use client';
import Link from 'next/link';
import { type ComponentProps } from 'react';
import { localePath } from '@/lib/i18n';
import { useLocale } from './locale-provider';

export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { locale } = useLocale();
  const target = typeof href === 'string' ? localePath(href, locale) : { ...href, pathname: href.pathname ? localePath(href.pathname, locale) : href.pathname };
  return <Link href={target} {...props} />;
}
