import { Heading } from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { PostWritterResult } from '../_components/GeneratedPost';
import { PostWritterContextProvider } from '../_components/PostWritterProvider';
import { TCarousel, TLinkedinPost } from '@/types/types';
import { LinkedinPost } from './_components/LinkedinPost';
import Editor from '@/components/editor/editor';
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getUserBrandKits } from '@/app/_actions/settings-actions';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { authOptions } from '@/auth';
import { AssistedClient } from './AssistedClient';

type PostWritterPageProps = {
    params: {
        postId: string;
    };
    searchParams: any;
};

export default async function PostWritterPage({
    params,
}: PostWritterPageProps) {
    const postId = params.postId;

    const session = await getServerSession(authOptions);
    const brands = await getUserBrandKits(session?.user.id!);

    let post: TLinkedinPost = {
        userId: '',
        id: 'new',
        content: '',
        author: {
            handle: brands[0]?.handle || '@ric_sala',
            name: brands[0]?.name || 'Ricardo Sala',
            pictureUrl: brands[0]?.imageUrl || '/images/placeholders/user.png',
        },
        publishedAt: new Date(),
        published: false,
    };

    let carousel = {} as TCarousel;
    let title = 'Crea tu post';

    if (!(postId === 'new')) {
        title = 'Edita tu post';
        const dbPost = await db?.linkedinPost.findUnique({
            where: {
                id: postId,
            },
        });

        if (!dbPost || dbPost?.userId !== session?.user.id) {
            return notFound();
        }

        post = dbPost;

        // TODO: For now this is a "hack" to deal with the mongo null limitation
        const carousels = await db.carousel.findMany({
            where: {
                linkedinPostId: postId,
            },
        });

        const lastCarousel = carousels[carousels.length - 1];

        if (lastCarousel) {
            carousel = lastCarousel;
        }
    }

    return (
        <>
            <Heading className='mt-6' title={title} subtitle='' />
            <Separator />
            <div className='w-full'>
                <PostWritterContextProvider initialPost={post}>
                    <AssistedClient carousel={carousel} />
                </PostWritterContextProvider>
            </div>
        </>
    );
}
