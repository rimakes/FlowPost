'use server';

import { db } from '@/lib/prisma';
import { wait } from '@/lib/utils';
import { Pure } from '@/types/types';
import { LinkedinPost, Post } from '@prisma/client';

export async function testingServer(input: string) {
    await wait(3000);
    console.log(input);
}

export async function createLinkedinPost(post: string) {
    console.log('holasssss');
    const user = await db.linkedinPost.create({
        data: {
            content: post,
            author: {
                handle: 'Ricardo Sala',
                name: 'Ricardo Sala',
                pictureUrl: 'Ricardo Sala',
            },
        },
    });
    console.log(user);
}
