import { db } from '@/lib/prisma';
import { TScheduledPost } from '@/types/types';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 *
 * @param req.body -> contains data of the post to be scheduled
 * @returns schedulePost
 */
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)!;
        const body: TScheduledPost = await req.json();
        const userId = session?.user?.id!;

        // Need to ensure that the user is the owner of the post
        // TODO: check if the user is the owner of the post
        const linkedinPost = await db.linkedinPost.findUnique({
            where: {
                id: body.linkedinPostId!,
            },
        });

        // REVIEW: We need to fix the whole database...there is a bit of a mess with the relationships

        const schedulePost: TScheduledPost = await db.scheduledPost.create({
            data: {
                ...body,
                userId,
            },
        });

        return NextResponse.json({ schedulePost }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

/**
 *
 * @param req ->to update the post time
 * @returns -> returns the updated post
 */
export async function PUT(req: NextRequest) {
    try {
        const body: TScheduledPost = await req?.json();
        const searchParams = new URLSearchParams(req.nextUrl.search);
        const id = searchParams.get('id')!;
        let checkScheduledPost = await db.scheduledPost.findUnique({
            where: {
                id,
            },
        });

        if (!checkScheduledPost) {
            return NextResponse.json(
                { error: 'Something went wrong' },
                { status: 500 }
            );
        }

        const schedulePost = await db.scheduledPost.update({
            where: {
                id,
            },
            data: { time: body?.time },
        });

        checkScheduledPost = await db.scheduledPost.findUnique({
            where: { id },
        });
        return NextResponse.json(
            { updatedScheduledPost: schedulePost },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

/**
 *
 * @param req -> userId : based on userId we will fetch the all the posts of user which are on schedule
 * @returns fetched scheduled posts
 */
// TODO: This is actually pretty dangerous. A user could change the URL to get to get the scheduled post of another user's posts!! You should use the session to get the user's ID...
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id!;
        const scheduledPost = await db.scheduledPost.findMany({
            where: {
                userId,
            },
            include: {
                linkedinPost: true,
            },
        });

        return NextResponse.json({ scheduledPost }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

/**
 *
 * @param req: id -> id for unschedule the scheduled post from schedule
 *           : deleteData -> if user deletes the post then it will be deleted from linkedinPost and from scheduledPost
 * @returns :if unschedule happens then  unscheduled: true
 *          :if delete happens then  delete: true
 */
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const id = searchParams.get('id')!;
        const deleteData = searchParams.get('deleteData')!;
        const checkScheduledPost = await db.scheduledPost.findUnique({
            where: {
                id,
            },
        });

        const postId = checkScheduledPost?.linkedinPostId!;

        if (!checkScheduledPost) {
            return NextResponse.json(
                { error: 'Something went wrong' },
                { status: 500 }
            );
        }

        await db.scheduledPost.delete({
            where: {
                id: checkScheduledPost?.id,
            },
        });

        if (deleteData === 'true') {
            await db.scheduledPost.deleteMany({
                // REVIEW: We are supposing here there can be several schedules for the same post.
                // not saying it's wrong, but it's something to keep in mind
                where: {
                    linkedinPostId: postId,
                },
            });
            await db.linkedinPost.delete({
                where: {
                    id: postId,
                },
            });

            return NextResponse.json({ delete: true }, { status: 200 });
        }
        return NextResponse.json({ unscheduled: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
