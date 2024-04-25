'use client';
import { useContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import {
    addDays,
    compareAsc,
    format,
    getDay,
    isBefore,
    isSameDay,
    parse,
} from 'date-fns';
import { SchedulerContext } from './SchedulerProvider';
import { WeekSlider } from './WeekSlider';
import { DaySchedule } from './DaySchedule';
import {
    PostOrSlot,
    TLinkedinPost,
    TScheduledPost,
    TSlot,
} from '@/types/types';
import { Separator } from '@/components/ui/separator';
import { loadSchedulePerDay, range } from '@/lib/utils';

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
                let time = new Intl.DateTimeFormat('en-US', {
                    timeZone: 'utc',
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(post.scheduledPost[0].date);

                // console.log(
                //     'post.scheduledPost[0].date',
                //     post.scheduledPost[0].date
                // );

                // console.log('formatted slot time', time);

                return {
                    hasPost: true,
                    time,
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
    }, [userPosts, userSchedule, weekDaysArray]);

    return (
        <>
            <WeekSlider />
            <Separator />
            <div className='flex overflow-x-auto'>
                {mergedSlotsAndPosts.map((mergedSlotsAndPosts, i) => {
                    // console.log('mergedSlotsAndPosts', mergedSlotsAndPosts);
                    return (
                        <DaySchedule
                            key={i}
                            date={weekDaysArray[i]}
                            slots={mergedSlotsAndPosts}
                            className={`max-h-none min-w-0 flex-1`}
                        />
                    );
                })}
            </div>
        </>
    );
}
