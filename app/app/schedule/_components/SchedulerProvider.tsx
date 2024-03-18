'use client';

import { LinkedinPost } from '@prisma/client';
import { ReactNode, createContext, useState } from 'react';

type SchedulerProviderProps = {
    userPosts: any;
    children: ReactNode;
};

const currentDate = new Date();
const standardizedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
);

const INITIAL_STATE = {
    userPosts: {} as LinkedinPost[],
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
        console.log('next week!!!');
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() + 7);
        setStartDate(newStartDate);
    };

    const onPrevWeek = () => {
        console.log('prev week!!!');
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
