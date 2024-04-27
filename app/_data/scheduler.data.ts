// await db.scheduledPost.create({
//     data: {
//         ...body,
//         userId,
//     },
// });

import { db } from '@/lib/prisma';

export const dbCreateScheduledPost = async (
    linkedinPostId: string,
    userId: string,
    date: Date,
    time: string
) => {
    try {
        const newScheduledPost = await db.scheduledPost.create({
            data: {
                linkedinPostId,
                userId,
                date,
                time,
            },
        });

        return newScheduledPost;
    } catch (error) {
        console.error('Error creating scheduled post', error);
        throw new Error('Error creating scheduled post'); // Replace this with your custom error or error handling logic
    }
};
