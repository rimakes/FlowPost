import { getServerSession } from 'next-auth';
import { Suspense } from 'react';
import { PostWritterForm } from './_components/postWritterForm/PostWritterForm';
import { PostWritterResult } from './_components/GeneratedPost';
import { PostWritterContextProvider } from './_components/PostWritterProvider';
import { Heading } from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { TPageProps } from '@/types/types';
import { getUserBrands } from '@/app/_actions/settings-actions';
import { getWrittingStyles } from '@/app/_actions/user-actions';

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
    const writtingStyles = await getWrittingStyles(session!.user.id);
    const writtingStyleNameAndIdArray = writtingStyles.map((style) => ({
        name: style.name,
        id: style.id,
    }));

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
                        <PostWritterForm
                            className='flex-1'
                            writtingStyles={writtingStyleNameAndIdArray}
                        />
                    </Suspense>
                    <PostWritterResult className='flex-1' />
                </PostWritterContextProvider>
            </div>
        </>
    );
}
