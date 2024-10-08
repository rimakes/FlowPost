import { Prisma } from '@prisma/client';
import { db } from '@/lib/prisma';

export const getFirstSettingsByUserId = async (userId: string) => {
    try {
        const settings = await db.settings.findFirst({
            where: {
                user: {
                    id: userId,
                },
            },
        });

        return settings;
    } catch (error) {
        console.error('Error getting settings', error);
        throw new Error('Error getting settings');
    }
};

export const getSettingsById = async (settingsId: string) => {
    try {
        const settings = await db.settings.findUnique({
            where: {
                id: settingsId,
            },
        });

        return settings;
    } catch (error) {
        console.error('Error getting settings', error);
        throw new Error('Error getting settings');
    }
};

export const updateScheduleBySettingsId = async (
    settingsId: string,
    schedule: {
        dayOfTheWeek: number;
        time: string;
    }[]
) => {
    try {
        const updatedSettings = await db.settings.update({
            where: {
                id: settingsId,
            },
            data: {
                schedule,
            },
        });

        return updatedSettings;
    } catch (error) {
        console.error('Error updating settings', error);
        throw new Error('Error updating settings');
    }
};

export const updateIASettingsByUserId = async (
    userId: string,
    iaSettings: Prisma.SettingsUpdateInput['iaSettings']
) => {
    try {
        const updatedSettings = await db.settings.updateMany({
            where: {
                user: {
                    id: userId,
                },
            },
            data: {
                iaSettings,
            },
        });

        return updatedSettings;
    } catch (error) {
        console.error('Error updating settings', error);
        throw new Error('Error updating settings');
    }
};
