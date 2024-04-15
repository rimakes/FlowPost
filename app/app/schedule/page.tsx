import { db } from '@/lib/prisma';
import Scheduler from './_components/Scheduler';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import Container from '@/components/shared/container';
import { Heading } from '@/components/shared/Heading';
import { TimeSlotSettings } from './_components/TimeSlotSettings';
import { Separator } from '@/components/ui/separator';
import { SchedulerProvider } from './_components/SchedulerProvider';
import {
    findPostsByUserId,
    getScheduleByUserId,
} from '@/app/_actions/schedule-actions';
import { UrlErrorToaster } from '@/components/shared/UrlErrorToaster';
import { Suspense } from 'react';

export default async function SchedulePage() {
    const session = await getServerSession(authOptions);
    // TODO: can be done in parallel
    const userPosts = await findPostsByUserId(session?.user.id!);
    const schedule = await getScheduleByUserId(session?.user.id!);
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
                    <TimeSlotSettings schedule={schedule!} />
                </div>
            </Container>
            <Separator />
            {/* REVIEW: there must be a better way to solve this */}
            <Suspense>
                <UrlErrorToaster />
            </Suspense>
            <SchedulerProvider userPosts={userPosts}>
                <Scheduler userPosts={userPosts} userSchedule={schedule!} />
            </SchedulerProvider>
        </>
    );
}
