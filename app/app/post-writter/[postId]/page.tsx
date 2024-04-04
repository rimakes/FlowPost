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

type PostWritterPageProps = {
    params: {
        postId: string;
    };
    searchParams: any;
};

export default async function PostWritterPage({
    params,
    searchParams,
}: PostWritterPageProps) {
    const postId = params.postId;

    const session = await getServerSession(authOptions);
    const brands = await getUserBrandKits(session?.user.id!);

    let post: TLinkedinPost = {
        userId: '',
        id: 'new',
        content: '',
        author: {
            handle: brands[0].handle,
            name: brands[0].name,
            pictureUrl: brands[0].imageUrl,
        },
        publishedAt: new Date(),
        published: false,
    };

    let carousel: TCarousel = {} as TCarousel;

    if (!(postId === 'new')) {
        const dbPost = await prisma?.linkedinPost.findUnique({
            where: {
                id: postId,
            },
        });

        console.log('dbPost', dbPost?.userId);
        console.log('session', session?.user.id);

        if (!dbPost || dbPost?.userId !== session?.user.id) {
            return notFound();
        }

        post = dbPost;

        const carousels = await db.carousel.findMany({
            where: {
                linkedinPostId: postId,
            },
        });

        console.log('carousels', carousels);

        const lastCarousel = carousels[carousels.length - 1];

        if (lastCarousel) {
            carousel = lastCarousel;
        }
    }

    return (
        <>
            <Heading className='mt-6' title='Edita tu post' subtitle='' />
            <Separator />
            <div className='mt-6 2xl:flex gap-8'>
                <PostWritterContextProvider initialPost={post}>
                    <PostWritterResult
                        className='flex-1'
                        isEditable={true}
                        showEditableSwitch={false}
                        carouselId={carousel.id}
                    />
                    <LinkedinPost
                        className='flex-1 mx-auto'
                        carousel={carousel}
                    />
                </PostWritterContextProvider>
            </div>
        </>
    );
}
