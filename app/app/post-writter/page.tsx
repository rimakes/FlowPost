import { Heading } from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { PostWritterForm } from './_components/PostWritterForm';
import { PostWritterResult } from './_components/GeneratedPost';
import { PostWritterContextProvider } from './_components/PostWritterProvider';
import { getServerSession } from 'next-auth';
import { getBrandsByUserId } from '@/app/_actions/shared-actions';

type PostWritterPageProps = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PostWritterPage({
    params,
    searchParams,
}: PostWritterPageProps) {
    const description = decodeURIComponent(
        searchParams['description'] as string
    );

    const session = await getServerSession();
    const brands = await getBrandsByUserId(session!.user.id);

    return (
        <>
            <Heading
                className='mt-6'
                title='Genera un post desde cero'
                subtitle='Utiliza el poder de la IA para generar post que tu audiencia no pueda dejar de leer'
            />
            <Separator />
            <div className='flex flex-col mt-6 2xl:flex-row gap-8'>
                <PostWritterContextProvider firstBrand={brands[0]}>
                    <PostWritterForm className='flex-1' />
                    <PostWritterResult className='flex-1' />
                </PostWritterContextProvider>
            </div>
        </>
    );
}
