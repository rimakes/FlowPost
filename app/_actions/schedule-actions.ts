'use server';

import { db } from '@/lib/prisma';
import {
    DayOfTheWeekNumber,
    TDaysOfTheWeek,
    TLinkedinPost,
} from '@/types/types';
import axios from 'axios';
import { parse, setHours } from 'date-fns';
import { revalidatePath } from 'next/cache';

// REVIEW: We need to modify this function to be able to post with image and videos as in the reference app

/*
share on linkedin from api :- https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin
linkedin end points : - https://www.linkedin.com/developers/apps/218468101/products/share-on-linkedin/endpoints
 */

type IData = {
    id: string;
};
type ResData = {
    data: IData;
    status: number;
};

type TUploadRegisterResponse = {
    data: {
        value: {
            uploadUrl: string;
            document: string;
        };
    };
};
/**
 * This function gets the url to upload an image to LinkedIn
 */
export const registerUploadImageToLinkedin = async (
    providerAccountId: String | undefined,
    accessToken: String | null | undefined
) => {
    const registerUploadUrl =
        'https://api.linkedin.com/v2/assets?action=registerUpload';

    const registerUploadBody = {
        registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
            owner: `urn:li:person:${providerAccountId}`,
            serviceRelationships: [
                {
                    relationshipType: 'OWNER',
                    identifier: 'urn:li:userGeneratedContent',
                },
            ],
        },
    };

    const config = {
        method: 'post',
        url: registerUploadUrl,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Cookie: 'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
            'X-Restli-Protocol-Version': '2.0.0',
        },
        data: JSON.stringify(registerUploadBody),
    };

    const res: TUploadRegisterResponse = await axios(config);

    return {
        uploadUrl: res.data.value.uploadUrl,
        asset: res.data.value.document,
    };
};
/**
 * This function gets the url to upload an image to LinkedIn
 */
export const registerUploadDocumentToLinkedin = async (
    providerAccountId: String | undefined,
    accessToken: String | null | undefined
) => {
    const registerUploadUrl =
        'https://api.linkedin.com/rest/documents?action=initializeUpload';

    const registerUploadBody = {
        initializeUploadRequest: {
            owner: `urn:li:person:${providerAccountId}`,
        },
    };

    const config = {
        method: 'post',
        url: registerUploadUrl,
        headers: {
            'LinkedIn-Version': '202403',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            // Cookie: 'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
            // 'X-Restli-Protocol-Version': '2.0.0',
        },
        data: JSON.stringify(registerUploadBody),
    };

    let res: TUploadRegisterResponse;

    try {
        res = await axios(config);
    } catch (error) {
        console.error('Error registering document to LinkedIn:');
        throw error;
    }

    return {
        uploadUrl: res.data.value.uploadUrl,
        asset: res.data.value.document,
    };
};

export const uploadImageToLinkedin = async (
    uploadUrl: string,
    imageUrl: string,
    accessToken: String | null | undefined
) => {
    let imageData;

    try {
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer', // This ensures the data is returned as Buffer
        });

        imageData = response.data;
    } catch (error) {
        console.error(
            'Unable to retrieve image data from the provided URL ##1'
        );
        throw error;
    }

    // Upload the image data to LinkedIn
    const config = {
        method: 'post',
        url: uploadUrl,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/octet-stream',
            Cookie: 'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
            'X-Restli-Protocol-Version': '2.0.0',
        },
        data: imageData,
    };

    try {
        const res = await axios(config);
        console.log('Image uploaded to LinkedIn!:', res);
        return res.status;
    } catch (error) {
        console.error('Unable to upload image to LinkedIn. ##2');
        throw error;
    }
};

export const postOnLinkedIn = async (
    providerAccountId: String | undefined,
    content: String | null | undefined,
    accessToken: String | null | undefined,
    title: string,
    asset?: string
): Promise<ResData> => {
    try {
        const body = {
            author: `urn:li:person:${providerAccountId}`,
            commentary: content,
            visibility: 'PUBLIC',
            distribution: {
                feedDistribution: 'MAIN_FEED',
                targetEntities: [],
                thirdPartyDistributionChannels: [],
            },
            content: {
                media: {
                    title: title,
                    id: asset,
                },
            },
            lifecycleState: 'PUBLISHED',
            isReshareDisabledByAuthor: false,
        };

        const config = {
            method: 'post',
            url: 'https://api.linkedin.com/rest/posts', // REVIEW: why is not the url on the .env file?
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Cookie: 'lidc="b=VB85:s=V:r=V:a=V:p=V:g=5482:u=10:x=1:i=1709636502:t=1709720825:v=2:sig=AQEdKe_Tph37ThQKHeYqJGIgReeL6-NO"; bcookie="v=2&bc3682ee-a45b-45f5-8b9a-7d73f17ea686"',
                'X-Restli-Protocol-Version': '2.0.0',
                'LinkedIn-Version': '202403',
            },
            data: JSON.stringify(body),
        };
        const response = await axios(config);

        return response;
    } catch (error) {
        console.error('Error posting on LinkedIn ***:');
        console.error(error);
        throw error;
    }
};

export const toggleSlot = async (
    time: string,
    dayOfTheWeek: DayOfTheWeekNumber,
    settingsId: string
) => {
    const previousSettings = await db.settings.findUnique({
        where: {
            id: settingsId,
        },
    });

    const previousSchedule = previousSettings?.schedule || [];

    // Find if the slot exists
    const slot = previousSchedule.find(
        (slot) => slot.time === time && slot.dayOfTheWeek === dayOfTheWeek
    );

    if (!slot) {
        // If the slot does not exist, add it
        previousSchedule.push({
            dayOfTheWeek,
            time,
        });
    } else {
        // If the slot exists, delete it
        const index = previousSchedule.indexOf(slot);
        previousSchedule.splice(index, 1);
    }

    const updatedSettings = await db.settings.update({
        where: {
            id: settingsId,
        },
        data: {
            schedule: {
                set: previousSchedule,
            },
        },
    });

    revalidatePath('/app/schedule');
    // validateData();

    return updatedSettings;
};

/**
 * Add a time to the schedule (when including a time, Monday is always included)
 */
export const addTime = async (time: string, settingsId: string) => {
    const previousSettings = await db.settings.findUnique({
        where: {
            id: settingsId,
        },
    });

    const newSchedule = previousSettings?.schedule || [];

    const timeExist = newSchedule.find((slot) => slot.time === time);

    // If that time is already in the schedule, return
    if (timeExist) {
        return;
    } else {
        // Otherwise, add the time to the schedule on Monday
        newSchedule.push({
            dayOfTheWeek: 1,
            time,
        });
    }

    const updatedSettings = await db.settings.update({
        where: {
            id: settingsId,
        },
        data: {
            schedule: {
                set: newSchedule,
            },
        },
    });

    revalidatePath('/app/schedule');
    return updatedSettings;
};

export const schedulePost = async (
    postId: string,
    userId: string,
    date: Date,
    time: string
) => {
    let [timeString, period] = time.split(' ');

    // Parse the time from format 'hh:mmPM' to 24h format and set it to the date
    let parsedTime = parse(time, 'hh:mm aa', new Date());

    const hours = parsedTime.getHours();
    const minutes = parsedTime.getMinutes();

    date.setHours(hours, minutes);

    const newSchedule = db.scheduledPost.create({
        data: {
            linkedinPostId: postId,
            userId,
            date,
            time,
        },
    });
    revalidatePath('/app/schedule');

    return newSchedule;
};

export const unschedulePost = async (postId: string) => {
    const deletedSchedule = await db.scheduledPost.deleteMany({
        where: {
            linkedinPostId: postId,
        },
    });

    revalidatePath('/app/schedule');

    return deletedSchedule;
};

export const deletePost = async (postId: string) => {
    const deletedPost = await db.linkedinPost.delete({
        where: {
            id: postId,
        },
    });

    revalidatePath('/app/schedule');

    return deletedPost;
};

export const findPostsByUserId = async (userId: string) => {
    return db.linkedinPost.findMany({
        where: {
            userId: userId,
        },
        include: {
            scheduledPost: true,
        },
    });
};

export const getScheduleByUserId = async (userId: string) => {
    const userSettings = await db.settings.findFirst({
        where: {
            user: {
                is: {
                    id: userId,
                },
            },
        },
    });

    return userSettings?.schedule;
};
