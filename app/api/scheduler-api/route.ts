import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { registerUploadImageToLinkedin } from '../../_actions/schedule-actions';
import { TLinkedinPost, TScheduledPost } from '@/types/types';
import axios from 'axios';

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

export const postOnLinkedIn = async (
    providerAccountId: String | undefined,
    content: String | null | undefined,
    accessToken: String | null | undefined
) => {
    try {
        const body = {
            author: `urn:li:person:${providerAccountId}`,
            lifecycleState: 'PUBLISHED',
            specificContent: {
                'com.linkedin.ugc.ShareContent': {
                    shareCommentary: {
                        text: content,
                    },
                    shareMediaCategory: 'NONE',
                },
            },
            visibility: {
                'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
            },
        };

        const config = {
            method: 'post',
            url: process.env.LINKEDIN_POST_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Cookie: 'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
                'X-Restli-Protocol-Version': '2.0.0',
            },
            data: JSON.stringify(body),
        };

        const response = await axios(config);

        console.log(
            'Post successfully posted on LinkedIn:',
            response?.data?.id
        );
        return response;
    } catch (error) {
        console.error('Error posting on LinkedIn:', error);
        throw error;
    }
};
