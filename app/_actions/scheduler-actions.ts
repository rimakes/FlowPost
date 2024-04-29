'use server';

import { revalidatePath } from 'next/cache';
import {
    getFirstSettingsByUserId,
    getSettingsById,
    updateScheduleBySettingsId,
} from '../_data/other.data';
import {
    dbCreateScheduledPost,
    deleteScheduledPost,
    getLinkedinPosts,
} from '../_data/linkedinpost.data';
import { DayOfTheWeekNumber } from '@/types/types';

export const toggleSlot = async (
    time: string,
    dayOfTheWeek: DayOfTheWeekNumber,
    settingsId: string
) => {
    const previousSettings = await getSettingsById(settingsId);
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

    const updatedSettings = await updateScheduleBySettingsId(
        settingsId,
        previousSchedule
    );

    revalidatePath('/app/schedule');

    return updatedSettings;
};

/**
 * Add a time to the schedule (when including a time, Monday is always included)
 */
export const addTime = async (time: string, settingsId: string) => {
    const previousSettings = await getSettingsById(settingsId);

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

    const updatedSettings = await updateScheduleBySettingsId(
        settingsId,
        newSchedule
    );

    revalidatePath('/app/schedule');
    return updatedSettings;
};

export const schedulePost = async (
    postId: string,
    userId: string,
    date: Date,
    time: string
) => {
    const newSchedule = await dbCreateScheduledPost(postId, userId, date, time);
    revalidatePath('/app/schedule');

    return newSchedule;
};

export const unschedulePost = async (postId: string) => {
    const deletedSchedule = await deleteScheduledPost(postId);
    revalidatePath('/app/schedule');

    return deletedSchedule;
};

export const findPostsByUserId = async (userId: string) => {
    const linkedinPosts = await getLinkedinPosts(userId);
    return linkedinPosts;
};

export const getScheduleByUserId = async (userId: string) => {
    const userSettings = await getFirstSettingsByUserId(userId);
    return userSettings?.schedule;
};
