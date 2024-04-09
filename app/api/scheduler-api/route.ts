import { db } from '@/lib/prisma';
import {
    postOnLinkedIn,
    registerUploadDocumentToLinkedin,
    uploadImageToLinkedin,
} from '../../_actions/schedule-actions';
import { TLinkedinPost, TScheduledPost } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';
import { differenceInMinutes } from 'date-fns';

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

        pendingToPublishPosts.forEach((post) => {
            console.log('Post Date', post.date);
            console.log('Now', now);
            console.log('pub = false', post.linkedinPost.published === false);
            console.log('published', post.linkedinPost.published);
            const isBeforeNow = post.date < now;
            console.log('Is Before Now', isBeforeNow);
            const isAfterStartOfDay = post.date > startOfDay;
            console.log('Is After Start of Day', isAfterStartOfDay);

            // fns to see the difference between two dates
            const diff = differenceInMinutes(post.date, now);
            console.log('Difference in minutes', diff);
        });

        console.log('Posts to be published', pendingToPublishPosts);
        return NextResponse.json({ message: 'Scheduled' }, { status: 201 });

        if (pendingToPublishPosts.length === 0) {
            console.log('No post to be published');
            return NextResponse.json(
                { message: 'No post to be published' },
                { status: 200 }
            );
        }

        pendingToPublishPosts?.forEach(async (post: NewTScheduledPost) => {
            // const currentDate = new Date();
            // console.log('Post to be published', post);

            const userAccount = await db.account.findFirst({
                where: {
                    userId: post?.userId,
                    provider: 'linkedin',
                },
            });

            if (!userAccount) return;

            console.log('search if there is a carousel for this post 22.29');

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
                await uploadImageToLinkedin(
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

            return NextResponse.json(
                { message: 'Scheduled on Linkedin' },
                { status: posted.status }
            );
            // if (posted.status === 201 && post?.linkedinPostId !== null) {
            //     // if post is successfully posted on linkedin
            //     await db.linkedinPost.update({
            //         // update the linkedin post to published
            //         where: {
            //             id: post?.linkedinPostId,
            //         },
            //         data: {
            //             published: true,
            //             publishedAt: new Date(),
            //         },
            //     });
            // }
        });

        return NextResponse.json({ message: 'Scheduled' }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

// const posts = [
//     {
//       id: '660800e72633403eac646e52',
//       time: '12:00 AM',
//       date: 2024-04-02T10:00:00.000Z,
//       userId: '65fd6dbb1a20ce76da44b999',
//       createdAt: 2024-03-30T12:09:11.139Z,
//       updatedAt: 2024-03-30T12:09:11.139Z,
//       linkedinPostId: null,
//       linkedinPost: null
//     },
//     {
//       id: '660803ca2633403eac646e53',
//       time: '10:45 PM',
//       date: 2024-04-01T08:45:00.000Z,
//       userId: '65fd6dbb1a20ce76da44b999',
//       createdAt: 2024-03-30T12:21:30.695Z,
//       updatedAt: 2024-03-30T12:21:30.695Z,
//       linkedinPostId: null,
//       linkedinPost: null
//     },
//     {
//       id: '660804d52633403eac646e57',
//       time: '04:15 PM',
//       date: 2024-04-01T02:15:00.000Z,
//       userId: '65fd6dbb1a20ce76da44b999',
//       createdAt: 2024-03-30T12:25:57.365Z,
//       updatedAt: 2024-03-30T12:25:57.365Z,
//       linkedinPostId: null,
//       linkedinPost: null
//     },
//     {
//       id: '660804f82633403eac646e58',
//       time: '10:45 PM',
//       date: 2024-04-01T08:45:00.000Z,
//       userId: '65fd6dbb1a20ce76da44b999',
//       createdAt: 2024-03-30T12:26:32.730Z,
//       updatedAt: 2024-03-30T12:26:32.730Z,
//       linkedinPostId: null,
//       linkedinPost: null
//     },
//     {
//       id: '660a7652adf23b88053f4ca7',
//       time: '03:45 AM',
//       date: 2024-04-01T01:45:00.000Z,
//       userId: '65fd6dbb1a20ce76da44b999',
//       createdAt: 2024-04-01T08:54:42.537Z,
//       updatedAt: 2024-04-01T08:54:42.537Z,
//       linkedinPostId: null,
//       linkedinPost: null
//     },
//     {
//       id: '660e84c1b2d05a9df5e0b323',
//       time: '12:00 PM',
//       date: 2024-04-04T10:00:00.000Z,
//       userId: '660e7129b2d05a9df5e0b319',
//       createdAt: 2024-04-04T10:45:21.815Z,
//       updatedAt: 2024-04-04T10:45:21.815Z,
//       linkedinPostId: null,
//       linkedinPost: null
//     },
//     {
//       id: '661552e5cbb66ec98d050a3e',
//       time: '12:15 AM',
//       date: 2024-04-09T00:15:00.000Z,
//       userId: '6612fae819b46e0f9bb326d4',
//       createdAt: 2024-04-09T14:38:29.979Z,
//       updatedAt: 2024-04-09T14:38:29.979Z,
//       linkedinPostId: '661548092f9881720f6326b8',
//       linkedinPost: {
//         id: '661548092f9881720f6326b8',
//         createdAt: 2024-04-09T13:52:09.590Z,
//         updatedAt: 2024-04-09T13:52:09.590Z,
//         content: 'This is a test to see how it works',
//         published: false,
//         publishedAt: null,
//         userId: '6612fae819b46e0f9bb326d4',
//         author: [Object]
//       }
//     },
//     {
//       id: '661555db7da1ec3c9ad9f391',
//       time: '12:15 AM',
//       date: 2024-04-08T00:15:00.000Z,
//       userId: '6612fae819b46e0f9bb326d4',
//       createdAt: 2024-04-09T14:51:07.163Z,
//       updatedAt: 2024-04-09T14:51:07.163Z,
//       linkedinPostId: '66155589574784e7032fbee3',
//       linkedinPost: {
//         id: '66155589574784e7032fbee3',
//         createdAt: 2024-04-09T14:49:45.610Z,
//         updatedAt: 2024-04-09T14:49:45.610Z,
//         content: 'test',
//         published: false,
//         publishedAt: null,
//         userId: '6612fae819b46e0f9bb326d4',
//         author: [Object]
//       }
//     }
//   ]
