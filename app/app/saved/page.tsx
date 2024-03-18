import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/shared/Heading';
import { db } from '@/lib/prisma';
import { PostCard } from './_components/PostCard';
import { SavedPageClient } from './_components/SavedPageClient';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

const findPostByUserId = async (userId: string) => {
    return db.linkedinPost.findMany({
        where: {
            userId: userId,
        },
    });
};
const findCarruselsByUserId = async (userId: string) => {
    return db.carousel.findMany({
        where: {
            userId: userId,
        },
    });
};

const findIdeasByUserId = async (userId: string) => {
    return db.idea.findMany({
        where: {
            authorId: userId,
        },
    });
};

export default async function IdeasPage() {
    const session = await getServerSession(authOptions);

    const userPosts = await findPostByUserId(session?.user.id!);
    const userCarrusels = await findCarruselsByUserId(session?.user.id!);
    const userIdeas = await findIdeasByUserId(session?.user.id!);

    return (
        <div>
            <Heading
                className='mt-6'
                title='Post y Carrusels guardados'
                subtitle='Aquí encontrarás tus post y carrusels guardados.'
            />
            <Separator />

            <SavedPageClient
                posts={userPosts}
                carrusels={userCarrusels}
                ideas={userIdeas}
            />
        </div>
    );
}
