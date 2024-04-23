'use client';

import { daysOfTheWeekMap } from '@/config/const';
import { cn } from '@/lib/utils';
import { PostOrSlot } from '@/types/types';
import { useSession } from 'next-auth/react';
import { PostSlot } from './PostSlot';

type DayScheduleProps = {
    date: Date;
    slots: PostOrSlot[];
    className?: string;
};

export function DaySchedule({ slots, className, date }: DayScheduleProps) {
    const currentDay = new Date();
    const { data } = useSession();
    const userProfileImageUrl = data?.user?.image;
    const day = date.getDate();
    const month = date.getMonth();
    // @ts-ignore
    const dayOfWeek = daysOfTheWeekMap[date.getDay()];

    return (
        <div className={cn(`flex flex-col divide-x divide-y `, className)}>
            <div
                className={cn(
                    `border-l border-border bg-primary/1 flex items-center justify-center p-2 text-primary/60`,
                    date === currentDay ? 'bg-primary/5' : 'bg-primary/1'
                )}
            >
                {dayOfWeek} {day}
                <br />
            </div>
            <div className='grow p-2 flex flex-col gap-2 '>
                {slots &&
                    slots.sort()!.map((slot, i) => {
                        // console.log('slot time', slot.time);
                        return (
                            <PostSlot
                                key={i}
                                isAvailable={!slot.hasPost}
                                postId={slot.postId!}
                                postContent={slot.postContent!}
                                time={slot.time}
                                userProfileImageUrl={userProfileImageUrl!}
                                date={date}
                                isPublished={slot.isPublished}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
