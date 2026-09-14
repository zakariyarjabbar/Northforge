import Link from 'next/link';
import { ArrowUpRight } from '@/components/icons';
export default function NotFound() { return <div className="wrap not-found"><span>404</span><h1>This route ends here.</h1><p>There’s plenty more to explore. Return to the group or find a project that interests you.</p><div className="record-actions"><Link className="button" href="/">Back to NORTHFORGE <ArrowUpRight size={18}/></Link><Link className="button button-outline" href="/projects/">Explore projects</Link></div></div>; }
