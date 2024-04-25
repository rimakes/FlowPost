import { Heading } from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { PostWritterForm } from './_components/PostWritterForm';
import { PostWritterResult } from './_components/GeneratedPost';
import { PostWritterContextProvider } from './_components/PostWritterProvider';
import { getServerSession } from 'next-auth';
import { TPageProps } from '@/types/types';
import { Suspense } from 'react';
import { getUserBrands } from '@/app/_actions/settings-actions';

export default async function PostWritterPage({
    params,
    searchParams,
}: TPageProps) {
    const description = decodeURIComponent(
        searchParams['description'] as string
    );

    const carouselId = searchParams['carouselId'];

    const session = await getServerSession();
    const brands = await getUserBrands(session!.user.id);

    return (
        <>
            <Heading
                className='mt-6'
                title='Genera un post desde cero'
                subtitle='Utiliza el poder de la IA para generar post que tu audiencia no pueda dejar de leer'
            />
            <Separator />
            <div className='mt-6 flex flex-col gap-8 2xl:flex-row'>
                <PostWritterContextProvider firstBrand={brands[0]}>
                    <Suspense>
                        <PostWritterForm className='flex-1' />
                    </Suspense>
                    <PostWritterResult className='flex-1' />
                </PostWritterContextProvider>
            </div>
        </>
    );
}
