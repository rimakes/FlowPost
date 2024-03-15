import { Heading } from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { PostWritterResult } from '../_components/GeneratedPost';
import { PostWritterContextProvider } from '../_components/PostWritterProvider';
import { TLinkedinPost } from '@/types/types';
import { LinkedinPost } from './_components/LinkedinPost';

type PostWritterPageProps = {
    params: {
        postId: string;
    };
};

export default async function PostWritterPage({
    params,
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

    return (
        <>
            <Heading className='mt-6' title='Edita tu post' subtitle='' />
            <Separator />
            <div className='mt-6 2xl:flex gap-8'>
                <PostWritterContextProvider initialPost={post}>
                    {/* <PostWritterForm className='flex-1' /> */}
                    <PostWritterResult className='flex-1' isEditable={true} />
                    <LinkedinPost className='flex-1 mx-auto max-h-[50%]' />
                </PostWritterContextProvider>
            </div>
        </>
    );
}
