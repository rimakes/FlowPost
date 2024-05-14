import { signIn } from 'next-auth/react';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { getLinkedinPosts } from '@/app/_data/linkedinpost.data';
import { WrittingStylesClient } from '@/app/app/settings/writting-styles/[id]/WrittingStylesClient';
import { getWrittingStyles } from '@/app/_actions/user-actions';
import { TWrittingStyle } from '@/types/types';

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        signIn();
    }

    const userPosts = await getLinkedinPosts(session!.user.id);

    const id = params.id;

    let writtingStyle: TWrittingStyle = {
        id: '',
        name: '',
        inputs: { posts: [] },
        userId: '',
        description: '',
    };

    if (id !== 'new') {
        const userWrittingStyles = await getWrittingStyles(session!.user.id);
        writtingStyle = userWrittingStyles.findLast((ws) => ws.id === id)!;
    }

    return (
        <div>
            <WrittingStylesClient
                posts={userPosts}
                writtingStyle={writtingStyle}
            />
        </div>
    );
}
