import View from '@/views/expertise-detail';
export { generateMetadata, generateStaticParams } from '@/views/expertise-detail';
export default function Page(props: { params: Promise<{ slug: string }> }) { return <View params={props.params} locale="en" />; }
