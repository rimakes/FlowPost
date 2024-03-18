'use client';
import { useContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import {
    PostOrSlot,
    TLinkedinPost,
    TScheduledPost,
    TSlot,
} from '@/types/types';
import { SchedulerContext } from './SchedulerProvider';
import { WeekSlider } from './WeekSlider';
import { Separator } from '@/components/ui/separator';
import { DaySchedule } from './DaySchedule';
import { loadSchedulePerDay, range } from '@/lib/utils';
import { addDays, getDay, isSameDay } from 'date-fns';

type userPostsProps = {
    userPosts: (TLinkedinPost & { scheduledPost: TScheduledPost[] })[];
    userSchedule: TSlot[];
};

export default function Scheduler({ userPosts, userSchedule }: userPostsProps) {
    const { startDate } = useContext(SchedulerContext);

    const weekDaysArray = range(0, 7).map((i) => {
        return addDays(startDate, i);
    });

    const formattedSchedule = useMemo(() => {
        return loadSchedulePerDay(userSchedule);
    }, [userSchedule]);

    return (
        <>
            <WeekSlider />
            <Separator />
            <div className='flex border-0 border-green-500 overflow-x-auto'>
                {weekDaysArray.map((date, i) => {
                    const daySlots = formattedSchedule[getDay(date)] || [];

                    const postsOfTheDay = userPosts.filter((post) => {
                        return isSameDay(date, post.scheduledPost[0]?.date);
                    });

                    const formattePostsOfTheDay: PostOrSlot[] =
                        postsOfTheDay.map((post) => {
                            return {
                                hasPost: true,
                                time: post.scheduledPost[0].time,
                                postContent: post.content,
                                postId: post.scheduledPost[0].linkedinPostId!,
                            };
                        });

                    const formattedDaySlots: PostOrSlot[] = daySlots
                        .filter(
                            // filter out the slots that already have a post
                            (time) =>
                                !formattePostsOfTheDay.some(
                                    (post) => post.time === time
                                )
                        )
                        .map((time) => ({
                            hasPost: false,
                            time,
                        }));

                    const mergedSlotsAndPosts = [
                        ...formattedDaySlots,
                        ...formattePostsOfTheDay,
                    ];

                    return (
                        <DaySchedule
                            key={i}
                            date={date}
                            slots={mergedSlotsAndPosts}
                            className='flex-1 min-w-0 max-h-none'
                        />
                    );
                })}
            </div>
        </>
    );
}
