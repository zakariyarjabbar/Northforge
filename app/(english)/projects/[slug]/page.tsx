import View from '@/views/project-detail';
export { generateMetadata, generateStaticParams } from '@/views/project-detail';
export default function Page(props: { params: Promise<{ slug: string }> }) { return <View params={props.params} locale="en" />; }
