import { Heading } from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { PostWritterResult } from '../_components/GeneratedPost';
import { PostWritterContextProvider } from '../_components/PostWritterProvider';
import { TCarousel, TLinkedinPost } from '@/types/types';
import { LinkedinPost } from './_components/LinkedinPost';
import Editor from '@/components/editor/editor';
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';

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

    let post: TLinkedinPost = {
        userId: '',
        id: 'new',
        content: '',
        author: {
            handle: 'Ricardo Sala',
            name: 'Ricardo Sala',
            pictureUrl: '/images/placeholders/user.png', // placeholder or the image of the user
        },
        publishedAt: new Date(),
        published: false,
    };

    if (!(postId === 'new')) {
        const dbPost = await prisma?.linkedinPost.findUnique({
            where: {
                id: postId,
            },
        });

        if (dbPost) {
            post = dbPost;
        }
    }

    let carouselId = searchParams['cid'] as string;

    console.log('carouselId', carouselId);
    let carousel: TCarousel = {} as TCarousel;
    if (carouselId) {
        try {
            carousel = (await db.carousel.findUnique({
                where: {
                    id: carouselId,
                },
            })) as TCarousel;
            console.log('carousel', carousel);
        } catch (error) {
            console.error('Error getting carousel', error);
            notFound();
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
