import { getServerSession } from 'next-auth';
import { Suspense } from 'react';
import { Heading } from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { TPageProps } from '@/types/types';
import { getUserBrands } from '@/app/_actions/settings-actions';
import { PostWritterContextProvider } from '@/app/app/(writters)/framework/_components/PostWritterProvider';
import { PostWritterResult } from '@/app/app/(writters)/framework/_components/GeneratedPost';
import { CopyWritterForm } from '@/app/app/(writters)/_copy/_components/CopyWritterForm';

export default async function PostWritterPage({}: TPageProps) {
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
                        <CopyWritterForm className='flex-1' />
                    </Suspense>
                    <PostWritterResult className='flex-1' />
                </PostWritterContextProvider>
            </div>
        </>
    );
}
