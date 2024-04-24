'use server';

import { authOptions } from '@/auth';
import { db } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { getCarouselsByUserId } from './writter-actions';
import fs from 'fs';
import { aiTranscribe } from '@/lib/aiClients';

export const revalidateAllPaths = async () => {
    revalidatePath('/app', 'layout');
};

export const getSubscription = async () => {
    const session = await getServerSession(authOptions);

    const user = await db.user.findUnique({
        where: { id: session!.user.id },
    });

    return user?.stripeSubscription;
};

export const carouselsByUserId = async (userId: string) => {
    const carousels = await getCarouselsByUserId(userId);
    return carousels;
};

export const createWebmFile = async (formData: FormData) => {
    try {
        console.log(formData);

        // save the formdata to a file
        const fileRaw = formData.get('audio') as File; // get the file from the formdata
        const buffer = await fileRaw.arrayBuffer(); // convert the file to an array buffer

        const file = Buffer.from(buffer);
        const fileName = `audio.webm`;
        const filePath = `audio/${fileName}`;
        fs.writeFileSync(filePath, file);

        try {
            const loader = aiTranscribe(filePath);
            const docs = await loader.load();

            return docs[0].pageContent;
        } finally {
            // Delete the file at the end
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
