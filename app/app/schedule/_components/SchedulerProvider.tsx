'use client';

import { TLinkedinPost, TScheduledPost } from '@/types/types';
import { LinkedinPost, Prisma } from '@prisma/client';
import { ReactNode, createContext, useState } from 'react';

type SchedulerProviderProps = {
    userPosts: (LinkedinPost & { scheduledPost: TScheduledPost[] })[];
    children: ReactNode;
};

const currentDate = new Date();
const standardizedDate = new Date( // so we get the start of the day
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
);

const INITIAL_STATE = {
    userPosts: {} as (LinkedinPost & { scheduledPost: TScheduledPost[] })[],
    onNextWeek: () => {},
    onPrevWeek: () => {},
    startDate: standardizedDate,
};

export const SchedulerContext = createContext({
    ...INITIAL_STATE,
});
export function SchedulerProvider({
    userPosts,
    children,
}: SchedulerProviderProps) {
    const [startDate, setStartDate] = useState<Date>(() => standardizedDate);

    const onNextWeek = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() + 7);
        setStartDate(newStartDate);
    };

    const onPrevWeek = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() - 7);
        setStartDate(newStartDate);
    };

    return (
        <SchedulerContext.Provider
            value={{
                userPosts,
                onNextWeek,
                onPrevWeek,
                startDate,
            }}
        >
            {children}
        </SchedulerContext.Provider>
    );
}
