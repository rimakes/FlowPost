import { db } from '@/lib/prisma';
import Scheduler from './_components/Scheduler';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { DaysOfTheWeek } from '@prisma/client';

const findPostByUserId = async () => {
    return db.linkedinPost.findMany({
        where: {
            author: {
                is: {
                    name: 'Ricardo Sala',
                },
            },
        },
    });
};

const getScheduleByUserId = async (userId: string) => {
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

const toggleSchedule = async (
    dayOfWeek: DaysOfTheWeek,
    time: string,
    active: boolean,
    settingsId: string
) => {
    const updatedSettings = await db.settings.findUnique({
        where: {
            id: settingsId,
        },
        include: {
            user: true,
        },
    });

    console.log({ updatedSettings });

    return updatedSettings;
};

export default async function SchedulePage() {
    const session = await getServerSession(authOptions);
    const userPosts = await findPostByUserId();
    const schedule = await getScheduleByUserId(session?.user.id!);

    return <Scheduler userPosts={userPosts} userSchedule={schedule} />;
}
