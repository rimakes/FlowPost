'use client';

import { start } from 'repl';
import { useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, addWeeks, setDate } from 'date-fns';
import { SchedulerContext } from './SchedulerProvider';

type WeekSliderProps = {};
export function WeekSlider({}: WeekSliderProps) {
    const { onNextWeek, onPrevWeek, startDate, userPosts } =
        useContext(SchedulerContext);

    const formattedStartDate = new Date(startDate).toLocaleDateString('es-ES', {
        month: 'long',
        day: 'numeric',
    });
    const endDate = addDays(startDate, 6);
    const formattedEndDate = new Date(endDate).toLocaleDateString('es-ES', {
        month: 'long',
        day: 'numeric',
    });
    const currentYear = new Date().getFullYear();
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <section className='flex items-center justify-between p-8'>
            <ChevronLeft
                onClick={onPrevWeek}
                className='rounded-full p-1.5 hover:bg-gray-200'
                size={40}
            />
            <div className='flex flex-col items-center justify-between text-lg'>
                <p>
                    {`${formattedStartDate} - ${formattedEndDate}, ${currentYear}`}
                </p>
                <p>{currentTimezone}</p>
            </div>
            <ChevronRight
                onClick={onNextWeek}
                className='rounded-full p-1.5 hover:bg-gray-200'
                size={40}
            />
        </section>
    );
}
