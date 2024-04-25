import { db } from '@/lib/prisma';
import { TLinkedinPost, TScheduledPost } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';
import {
    registerUploadDocumentToLinkedin,
    uploadAssetToLinkedin,
    postOnLinkedIn,
} from '@/lib/linkedin';

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
        console.log('Start of the day', startOfDay);

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

        console.log('Posts to be published', pendingToPublishPosts);
        // return NextResponse.json({ message: 'Scheduled' }, { status: 201 });

        if (pendingToPublishPosts.length === 0) {
            console.log('No post to be published');
            return NextResponse.json(
                { message: 'No post to be published' },
                { status: 200 }
            );
        }

        for (const post of pendingToPublishPosts) {
            // const currentDate = new Date();
            console.log('LOOP: Post to be published', post);
            let userAccount;

            try {
                console.log('Fetching User Account');
                userAccount = await db.account.findFirst({
                    where: {
                        userId: post?.userId,
                        provider: 'linkedin',
                    },
                });
                console.log('User Account', userAccount);

                if (!userAccount) {
                    console.log('No linkedin account found');
                    return;
                }
            } catch (error) {
                console.error('Error fetching User Account:', error);
            }

            console.log('search if there is a carousel for this post');

            let carousel;
            try {
                carousel = await db.carousel.findFirst({
                    where: { linkedinPostId: post.linkedinPostId },
                });
            } catch (error) {
                console.error('Error fetching Carousel:', error);
            }

            console.log('Carousel', carousel);

            let asset;
            // console.log('Carousel', carousel?.pdfUrl);
            if (carousel?.pdfUrl) {
                console.log('Registering document to linkedin');
                const documentRegister = await registerUploadDocumentToLinkedin(
                    userAccount?.providerAccountId,
                    userAccount?.access_token
                );

                const { uploadUrl } = documentRegister;
                asset = documentRegister.asset;

                console.log('Uploading document to linkedin');
                await uploadAssetToLinkedin(
                    uploadUrl,
                    carousel?.pdfUrl!,
                    userAccount?.access_token
                );
            }
            console.log('Posting on linkedin');
            const posted = await postOnLinkedIn(
                userAccount?.providerAccountId,
                post?.linkedinPost?.content,
                userAccount?.access_token,
                carousel?.title!,
                asset
            );

            console.log('Posted STATUS', posted.status);

            // return NextResponse.json(
            //     { message: 'Scheduled on Linkedin' },
            //     { status: posted.status }
            // );
            if (posted.status === 201 && post?.linkedinPostId !== null) {
                // if post is successfully posted on linkedin
                await db.linkedinPost.update({
                    // update the linkedin post to published
                    where: {
                        id: post?.linkedinPostId,
                    },
                    data: {
                        published: true,
                        publishedAt: new Date(),
                    },
                });
            }
        }

        return NextResponse.json({ message: 'Scheduled' }, { status: 201 });
    } catch (error) {
        console.log(
            'error external trycatch',
            error
            // error.response.data.errorDetails
            // error.response.data.errorDetails
        );
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
