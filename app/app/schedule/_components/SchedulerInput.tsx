'use client';

import { time } from 'console';
import { compareAsc, format, parse } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useSession } from 'next-auth/react';
import { useMemo, useOptimistic, useTransition } from 'react';
import { date } from 'zod';
import { addTime, toggleSlot } from '@/app/_actions/schedule-actions';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { TIME_OF_THE_DAY, daysOfTheWeekMapNew } from '@/config/const';
import {
    capitalizeFirstLetter,
    deepCopy,
    loadWeekdaysPerTime,
} from '@/lib/utils';
import {
    DayOfTheWeekNumber,
    TNameTimeOfDay,
    TSlot,
    TimeMap,
} from '@/types/types';

type SchedulerInputProps = {
    schedule: TSlot[];
};

export function SchedulerInput({ schedule }: SchedulerInputProps) {
    const { data } = useSession();
    const weekdaysPerTimeMap = useMemo(
        () => loadWeekdaysPerTime(schedule),
        [schedule]
    );
    let [isPending, startTransition] = useTransition();

    const [optimisticTimeMap, optimisticallySetTimeMap] = useOptimistic<
        TimeMap,
        TimeMap
    >(weekdaysPerTimeMap, (state, newState) => {
        return newState;
    });

    // TODO: probably will want to memoize this
    const optimisticallyToggleTimeSlot = (newTimeSlot: TSlot) => {
        const newState = deepCopy(optimisticTimeMap);

        // Check if the time array of the new time slot exists
        const timeArrayExists = newState[newTimeSlot.time];

        // if it does not exist, we need to create it and add the slot of the given day
        if (!timeArrayExists) {
            newState[newTimeSlot.time] = [
                newTimeSlot.dayOfTheWeek as DayOfTheWeekNumber,
            ];
        }

        if (timeArrayExists) {
            // if the time exists, we need to check if the day exists
            const slotExists = newState[newTimeSlot.time].includes(
                newTimeSlot.dayOfTheWeek as DayOfTheWeekNumber
            );

            // If the day/slot does not exist, we need to add it
            if (!slotExists) {
                newState[newTimeSlot.time].push(
                    newTimeSlot.dayOfTheWeek as DayOfTheWeekNumber
                );
            }

            // If the slot exists, we need to delete it
            if (slotExists) {
                newState[newTimeSlot.time] = newState[newTimeSlot.time].filter(
                    (day) =>
                        day !== (newTimeSlot.dayOfTheWeek as DayOfTheWeekNumber)
                );
            }

            // If the array is empty, we need to delete the time array
            if (newState[newTimeSlot.time].length === 0) {
                delete newState[newTimeSlot.time];
            }
        }

        optimisticallySetTimeMap(newState);
    };

    const OptimisticallyAddTimeArray = (time: string) => {
        const newState = deepCopy(optimisticTimeMap);
        newState[time] = [1];
        optimisticallySetTimeMap(newState);
    };

    const timeOfTheDayNames = Object.keys(TIME_OF_THE_DAY);
    const timeSlots = Object.keys(optimisticTimeMap);

    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='invisible'>Hora</th> {/* empty */}
                        {[1, 2, 3, 4, 5, 6, 0].map((day, index) => (
                            <th key={index}>
                                {capitalizeFirstLetter(
                                    daysOfTheWeekMapNew[
                                        day as DayOfTheWeekNumber
                                    ]
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                {/* body */}
                <tbody>
                    {timeSlots
                        .sort((a, b) => {
                            const timeA = parse(a, 'hh:mm aa', new Date());
                            const timeb = parse(b, 'hh:mm aa', new Date());
                            return compareAsc(timeA, timeb);
                        })
                        .map((time, index) => {
                            // TODO: I am pretty sure this is not the best way to do this...
                            let now = new Date();
                            let day = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} `; // e.g., 2024-4-22
                            let dateString = day + time;
                            let dateObject = parse(
                                dateString,
                                'yyyy-M-d hh:mm aa',
                                new Date()
                            );
                            const hours = dateObject.getHours();
                            const minutes = dateObject.getMinutes();
                            dateObject.setUTCHours(hours, minutes);
                            const formattedTime = format(
                                dateObject,
                                'KK:mm aa'
                            );

                            return (
                                <tr key={index}>
                                    <td>{formattedTime}</td>
                                    {[1, 2, 3, 4, 5, 6, 0].map((day, index) => (
                                        <td key={index} className='text-center'>
                                            <Checkbox
                                                // type='checkbox'
                                                className=''
                                                checked={optimisticTimeMap[
                                                    time
                                                ].includes(
                                                    day as DayOfTheWeekNumber
                                                )}
                                                onCheckedChange={() =>
                                                    startTransition(() => {
                                                        {
                                                            optimisticallyToggleTimeSlot(
                                                                // optimistic change
                                                                {
                                                                    dayOfTheWeek:
                                                                        day,
                                                                    time,
                                                                }
                                                            );
                                                            toggleSlot(
                                                                //db change
                                                                time,
                                                                day as DayOfTheWeekNumber,
                                                                data?.user
                                                                    .settingsId!
                                                            );
                                                        }
                                                    })
                                                }
                                            />
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <Select
                onValueChange={(value) => {
                    startTransition(() => {
                        OptimisticallyAddTimeArray(value);
                        addTime(value, data?.user.settingsId!);
                    });
                }}
            >
                <SelectTrigger>Añadir hora</SelectTrigger>
                <SelectContent>
                    <>
                        {timeOfTheDayNames.map((time, index) => {
                            let now = new Date();
                            let day = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} `; // e.g., 2024-4-22
                            let dateString =
                                day + TIME_OF_THE_DAY[time as TNameTimeOfDay];
                            let date = parse(
                                dateString,
                                'yyyy-M-d hh:mm aa',
                                new Date()
                            );
                            let utcTimeZone = new Intl.DateTimeFormat('en-US', {
                                timeZone: 'UTC',
                                hour: '2-digit',
                                minute: '2-digit',
                            }).format(date);
                            return (
                                <SelectItem key={index} value={utcTimeZone}>
                                    {TIME_OF_THE_DAY[time as TNameTimeOfDay]}
                                </SelectItem>
                            );
                        })}
                    </>
                </SelectContent>
            </Select>
        </>
    );
}
