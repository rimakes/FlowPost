'use client';

import { useContext } from 'react';
import { SchedulerContext } from './SchedulerProvider';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { start } from 'repl';
import { addDays, addWeeks, setDate } from 'date-fns';

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
        <section className='flex justify-between items-center p-8'>
            <ChevronLeft
                onClick={onPrevWeek}
                className='hover:bg-gray-200 rounded-full p-1.5'
                size={40}
            />
            <div className='flex justify-between items-center flex-col text-lg'>
                <p>
                    {`${formattedStartDate} - ${formattedEndDate}, ${currentYear}`}
                </p>
                <p>{currentTimezone}</p>
            </div>
            <ChevronRight
                onClick={onNextWeek}
                className='hover:bg-gray-200 rounded-full p-1.5'
                size={40}
            />
        </section>
    );
}
