'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { daysOfTheWeekMap } from '@/config/const';
import { cn, range } from '@/lib/utils';
import { PostOrSlot, TLinkedinPost, TSlot } from '@/types/types';
import { MoreHorizontal } from 'lucide-react';
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
        <div
            className={cn(
                `flex flex-col divide-x divide-y border-0 border-red-500`,
                className
            )}
        >
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
