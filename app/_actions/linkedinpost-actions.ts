'use server';

import { revalidatePath } from 'next/cache';
import {
    dbDeleteLinkedinPost,
    dbGetPendingToPublishPost,
    dbUpsertLinkedinPost,
} from '../_data/linkedinpost.data';
import { TLinkedinPost } from '@/types/types';

export async function upsertLinkedinPost(
    post: TLinkedinPost,
    isDemo: boolean = false,
    authorId?: string,
    carouselId?: string
) {
    const userId = isDemo ? process.env.DEMO_USER_ID! : authorId!;
    let linkedinPost: TLinkedinPost;
    linkedinPost = await dbUpsertLinkedinPost(post, userId, carouselId);
    return linkedinPost;
}

export async function deleteLinkedinPost(postId: string) {
    await dbDeleteLinkedinPost(postId);

    // REVIEW: Does this revalidate the cache for EVERY user?
    revalidatePath('/app/schedule');
}

export const getPendingToPublishPost = async (startOfDay: Date, now: Date) => {
    let pendingToPublishPosts = await dbGetPendingToPublishPost(
        startOfDay,
        now
    );

    return pendingToPublishPosts;
};
