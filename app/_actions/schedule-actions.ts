'use server';

import { db } from '@/lib/prisma';
import { TDaysOfTheWeek } from '@/types/types';
import axios from 'axios';
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
};

export const postOnLinkedIn = async (
    providerAccountId: String | undefined,
    content: String | null | undefined,
    accessToken: String | null | undefined
): Promise<ResData> => {
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

export const toggleSlot = async (
    time: string,
    day: TDaysOfTheWeek,
    settingsId: string
) => {
    const previousSettings = await db.settings.findUnique({
        where: {
            id: settingsId,
        },
    });

    const previousSchedule = previousSettings?.schedule || [];

    const slotIndex = previousSchedule.findIndex(
        (slot) => slot.time === time && slot.day === day
    );

    if (slotIndex === -1) {
        console.log('Slot not found');
        previousSchedule.push({
            day,
            time,
            isSlot: true,
        });
    } else {
        console.log('Slot found');
        previousSchedule[slotIndex].isSlot =
            !previousSchedule[slotIndex].isSlot;
        console.log(previousSchedule[slotIndex].isSlot);
        console.log(previousSchedule);
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

export const addTimeArray = async (time: string, settingsId: string) => {
    const previousSettings = await db.settings.findUnique({
        where: {
            id: settingsId,
        },
    });

    const previousSchedule = previousSettings?.schedule || [];

    // If MON is already in the schedule, we don't need to add it again, just turn it into a slot
    const monIndex = previousSchedule.findIndex(
        (slot) => slot.day === 'MON' && slot.time === time
    );

    if (monIndex !== -1) {
        previousSchedule[monIndex].isSlot = true;
    } else {
        previousSchedule.push({
            day: 'MON',
            time,
            isSlot: true,
        });
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
