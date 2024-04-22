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
import {
    addDays,
    compareAsc,
    format,
    getDay,
    isBefore,
    isSameDay,
    parse,
} from 'date-fns';

type userPostsProps = {
    userPosts: (TLinkedinPost & { scheduledPost: TScheduledPost[] })[];
    userSchedule: TSlot[];
};

export default function Scheduler({ userPosts, userSchedule }: userPostsProps) {
    const { startDate } = useContext(SchedulerContext);

    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const weekDaysArray = range(0, 7).map((i) => {
        return addDays(startDate, i);
    });

    const mergedSlotsAndPosts = useMemo(() => {
        const formattedSchedule = loadSchedulePerDay(userSchedule);
        const merged = weekDaysArray.map((date, i) => {
            const daySlots = formattedSchedule[getDay(date)] || [];

            const dayPosts = userPosts.filter((post) => {
                return isSameDay(date, post.scheduledPost[0]?.date);
            });

            const formattedDayPosts: PostOrSlot[] = dayPosts.map((post) => {
                let timeInUserTimezone = new Intl.DateTimeFormat('en-US', {
                    timeZone: currentTimezone,
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(post.scheduledPost[0].date);

                console.log(
                    'post.scheduledPost[0].date',
                    post.scheduledPost[0].date
                );
                console.log('timeInUserTimezone', timeInUserTimezone);

                return {
                    hasPost: true,
                    time: timeInUserTimezone,
                    postContent: post.content,
                    postId: post.scheduledPost[0].linkedinPostId!,
                    isPublished: post.published,
                };
            });

            const formattedDaySlots: PostOrSlot[] = daySlots
                .filter(
                    // filter out the slots that already have a post
                    (time) =>
                        !formattedDayPosts.some((post) => post.time === time)
                )
                .map((time) => ({
                    hasPost: false,
                    time, // time already has the format 'hh:mm aa'
                }));

            const merged = [...formattedDaySlots, ...formattedDayPosts].sort(
                (a, b) => {
                    // parse the time to compare
                    const aTime = parse(a.time, 'hh:mm aa', new Date());
                    const bTime = parse(b.time, 'hh:mm aa', new Date());

                    return compareAsc(aTime, bTime);
                }
            );

            return merged;
        });

        return merged;
    }, [currentTimezone, userPosts, userSchedule, weekDaysArray]);

    return (
        <>
            <WeekSlider />
            <Separator />
            <div className='flex overflow-x-auto'>
                {mergedSlotsAndPosts.map((mergedSlotsAndPosts, i) => {
                    return (
                        <DaySchedule
                            key={i}
                            date={weekDaysArray[i]}
                            slots={mergedSlotsAndPosts}
                            className={`flex-1 min-w-0 max-h-none`}
                        />
                    );
                })}
            </div>
        </>
    );
}
