import { NextRequest, NextResponse } from 'next/server';
import {
    postOnLinkedIn,
    registerAndUploadDocumentToLinkedin,
} from '@/lib/linkedin';
import { dbUpdatePostAsPublished } from '@/app/_data/linkedinpost.data';
import { withMiddleware } from '@/app/api/(middleware)/with-middleware';
import { withCatch } from '@/app/api/(middleware)/with-catch';
import { getPendingToPublishPost } from '@/app/_actions/writter-actions';
import { getFirstUserAccount } from '@/app/_actions/user-actions';
import { getFirstCarousel } from '@/app/_actions/carousel-actions';

export const dynamic = 'force-dynamic';

// This endpoint will check the scheduled posts, which will be called every time from cron job to find if there is any post to be posted on linkedin.
async function getHandler(req: NextRequest) {
    // Get the post the beginning of the day to now that are pending to be published
    const now = new Date();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    let pendingToPublishPosts = await getPendingToPublishPost(startOfDay, now);

    if (pendingToPublishPosts.length === 0) {
        console.log('No post to be published');
        return NextResponse.json(
            { message: 'No post to be published' },
            { status: 200 }
        );
    }

    for (const post of pendingToPublishPosts) {
        const userAccount = await getFirstUserAccount(post.userId);
        if (!userAccount) {
            console.log('No linkedin account found');
            continue;
        }

        const carousel = await getFirstCarousel(post.linkedinPostId!);
        const asset = await registerAndUploadDocumentToLinkedin(
            carousel!,
            userAccount
        );

        const posted = await postOnLinkedIn(
            userAccount?.providerAccountId,
            post?.linkedinPost?.content,
            userAccount?.access_token,
            carousel?.title!,
            asset
        );

        if (posted.status === 201 && post?.linkedinPostId !== null) {
            await dbUpdatePostAsPublished(post.linkedinPostId);
        }
    }

    return NextResponse.json({ message: 'Scheduled' }, { status: 201 });
}

export const GET = withMiddleware(withCatch, getHandler);
