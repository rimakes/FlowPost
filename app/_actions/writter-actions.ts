'use server';

import { revalidatePath } from 'next/cache';
import { dbUpsertLinkedinPost } from '../_data/linkedinpost.data';
import { TLinkedinPost } from '@/types/types';

export async function upsertLinkedinPost(
    post: TLinkedinPost,
    isDemo: boolean = false,
    authorId?: string,
    carouselId?: string
) {
    const userId = isDemo ? process.env.DEMO_USER_ID! : authorId!;
    console.log({ isDemo }, { authorId }, { userId });
    let linkedinPost: TLinkedinPost;
    linkedinPost = await dbUpsertLinkedinPost(post, userId, carouselId);
    return linkedinPost;
}

export async function deleteLinkedinPost(postId: string) {
    await deleteLinkedinPost(postId);

    revalidatePath('/app/schedule');
}
