import { SiteRoot, siteMetadata } from '@/components/site-root';
export const metadata = siteMetadata;
export default function Layout({ children }: { children: React.ReactNode }) { return <SiteRoot locale="en">{children}</SiteRoot>; }
