import { LoadSpinner } from '@/components/shared/LoadSpinner';

export default function LoadingPage({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    return <LoadSpinner />;
}
