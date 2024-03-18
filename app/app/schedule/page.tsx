import { db } from '@/lib/prisma';
import Scheduler from './_components/Scheduler';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import Container from '@/components/shared/container';
import { Heading } from '@/components/shared/Heading';
import { TimeSlotSettings } from './_components/TimeSlotSettings';
import { TSlot } from '@/types/types';
import { Separator } from '@/components/ui/separator';
import {
    SchedulerContext,
    SchedulerProvider,
} from './_components/SchedulerProvider';

const findPostByUserId = async (userId: string) => {
    return db.linkedinPost.findMany({
        where: {
            userId: userId,
        },
        include: {
            scheduledPost: true,
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

export default async function SchedulePage() {
    const session = await getServerSession(authOptions);
    const userPosts = await findPostByUserId(session?.user.id!);
    const schedule = (await getScheduleByUserId(session?.user.id!)) as TSlot[];
    return (
        <>
            <Container
                className={
                    'flex flex-col border-0 border-red-400 border-dashed'
                }
            >
                <div className='flex justify-between items-baseline'>
                    <Heading
                        className='mt-6'
                        title='Programa'
                        subtitle='Programa tus  publicaciones para que se publiquen automáticamente.'
                    />
                    <TimeSlotSettings schedule={schedule} />
                </div>
            </Container>
            <Separator />
            <SchedulerProvider userPosts={userPosts}>
                <Scheduler userPosts={userPosts} userSchedule={schedule} />
            </SchedulerProvider>
        </>
    );
}
