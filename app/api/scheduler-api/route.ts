import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import {
    postOnLinkedIn,
    registerUploadImageToLinkedin,
} from '../../_actions/schedule-actions';
import { TLinkedinPost, TScheduledPost } from '@/types/types';

type NewTScheduledPost = TScheduledPost & {
    linkedinPost: TLinkedinPost;
};

export const dynamic = 'force-dynamic';

// This endpoint will check the scheduled posts, which will be called every time from cron job to find if there is any post to be posted on linkedin.
export async function GET(req: NextRequest) {
    try {
        console.log('Checking for scheduled posts');

        const now = new Date();
        console.log('Time Now', now);
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // finding the posts from the start of the day till end of day that are not published AND SHOULD BE PUBLISHED BY NOW
        let pendingToPublishPosts = (await db.scheduledPost.findMany({
            where: {
                date: {
                    gte: startOfDay,
                    lt: now,
                },
                linkedinPost: {
                    published: false,
                },
            },
            include: {
                linkedinPost: true,
            },
        })) as NewTScheduledPost[];

        pendingToPublishPosts?.forEach(async (post: NewTScheduledPost) => {
            // const currentDate = new Date();
            const userAccount = await db.account.findFirst({
                where: {
                    userId: post?.userId,
                    provider: 'linkedin',
                },
            });

            if (!userAccount) return;

            console.log('Posting on LinkedIn');
            const posted: { data: { id: string } } = await postOnLinkedIn(
                userAccount?.providerAccountId,
                post?.linkedinPost?.content,
                userAccount?.access_token
            );

            if (posted?.data?.id && post?.linkedinPostId !== null) {
                await db.linkedinPost.update({
                    where: {
                        id: post?.linkedinPostId,
                    },
                    data: {
                        published: true,
                        publishedAt: new Date(),
                    },
                });
            }
        });
        return NextResponse.json({ message: 'Scheduled' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
