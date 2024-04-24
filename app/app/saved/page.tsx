import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/shared/Heading';
import { SavedPageClient } from './_components/SavedPageClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { getLinkedinPosts } from '@/app/_data/linkedinpost.data';
import { ideasbyUserId } from '@/app/_actions/idea-actions';
import { carouselsByUserId } from '@/app/_actions/other-actions';

export default async function SavedPage() {
    const session = await getServerSession(authOptions);
    const userPosts = await getLinkedinPosts(session?.user.id!);
    const userCarrusels = await carouselsByUserId(session?.user.id!);
    const userIdeas = await ideasbyUserId(session?.user.id!);

    return (
        <div>
            <Heading
                className='mt-6'
                title='Post y Carrusels guardados'
                subtitle='Aquí encontrarás tus post y carrusels guardados.'
            />
            <Separator className='mb-6' />

            <SavedPageClient
                posts={userPosts}
                carrusels={userCarrusels}
                ideas={userIdeas}
            />
        </div>
    );
}
