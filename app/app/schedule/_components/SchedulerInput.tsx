'use client';

import { addTime, toggleSlot } from '@/app/_actions/schedule-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import {
    DaysOfTheWeek,
    TimeOfTheDay,
    daysOfTheWeekMapNew,
} from '@/config/const';
import { deepCopy, loadSchedulePerTime, range } from '@/lib/utils';
import {
    DayOfTheWeekNumber,
    TNameTimeOfDay,
    TSlot,
    TimeMap,
} from '@/types/types';
import { Separator } from '@radix-ui/react-separator';
import { table } from 'console';
import { useSession } from 'next-auth/react';
import { useMemo, useOptimistic, useTransition } from 'react';

type SchedulerInputProps = {
    schedule: TSlot[];
};

export function SchedulerInput({ schedule }: SchedulerInputProps) {
    console.log('rendering SchedulerInput');
    const { data } = useSession();
    const scheduleHash = useMemo(
        () => loadSchedulePerTime(schedule),
        [schedule]
    );
    let [isPending, startTransition] = useTransition();

    const [optimisticTimeMap, optimisticallySetTimeMap] = useOptimistic<
        TimeMap,
        TimeMap
    >(scheduleHash, (state, newState) => {
        return newState;
    });

    // TODO: probably will want to memoize this
    const optimisticallyToggleTimeSlot = (newTimeSlot: TSlot) => {
        const newState = deepCopy(optimisticTimeMap);

        // Check if the time array of the new time slot exists
        const timeArrayExists = newState[newTimeSlot.time];

        // if it does not exist, we need to create it and add the slot
        if (!timeArrayExists) {
            newState[newTimeSlot.time] = [
                newTimeSlot.dayOfTheWeek as DayOfTheWeekNumber,
            ];
        }

        if (timeArrayExists) {
            const slotExists = newState[newTimeSlot.time].includes(
                newTimeSlot.dayOfTheWeek as DayOfTheWeekNumber
            );

            // If the slot does not exist, we need to add it
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

    const timeOfTheDayNames = Object.keys(TimeOfTheDay);
    const timeSlots = Object.keys(optimisticTimeMap);

    return (
        <>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th></th> {/* empty */}
                        {[1, 2, 3, 4, 5, 6, 0].map((day, index) => (
                            <th key={index}>
                                {daysOfTheWeekMapNew[day as DayOfTheWeekNumber]}
                            </th>
                        ))}
                    </tr>
                </thead>
                {/* body */}
                <tbody>
                    {timeSlots.sort().map((time, index) => (
                        <tr key={index}>
                            <td>{time}</td>
                            {[1, 2, 3, 4, 5, 6, 0].map((day, index) => (
                                <td key={index} className='text-center'>
                                    <Checkbox
                                        // type='checkbox'
                                        className=''
                                        checked={optimisticTimeMap[
                                            time
                                        ].includes(day as DayOfTheWeekNumber)}
                                        onCheckedChange={() =>
                                            startTransition(() => {
                                                {
                                                    optimisticallyToggleTimeSlot(
                                                        {
                                                            dayOfTheWeek: day,
                                                            time,
                                                        }
                                                    );
                                                    toggleSlot(
                                                        time,
                                                        day as DayOfTheWeekNumber,
                                                        data?.user.settingsId!
                                                    );
                                                }
                                            })
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Select
                onValueChange={(value) => {
                    startTransition(() => {
                        OptimisticallyAddTimeArray(
                            TimeOfTheDay[value as TNameTimeOfDay]
                        );
                        addTime(
                            TimeOfTheDay[value as TNameTimeOfDay],
                            data?.user.settingsId!
                        );
                    });
                }}
            >
                <SelectTrigger>Añadir hora</SelectTrigger>
                <SelectContent>
                    <>
                        {timeOfTheDayNames.map((time, index) => (
                            <SelectItem key={index} value={time}>
                                {TimeOfTheDay[time as TNameTimeOfDay]}
                            </SelectItem>
                        ))}
                    </>
                </SelectContent>
            </Select>
        </>
    );
}
