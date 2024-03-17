'use client';

import { addTimeArray, toggleSlot } from '@/app/_actions/schedule-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DaysOfTheWeek, TimeOfTheDay } from '@/config/const';
import { deepCopy } from '@/lib/utils';
import { TDaysOfTheWeek, TNameTimeOfDay, TSlot } from '@/types/types';
import { table, time } from 'console';
import { PlusCircle } from 'lucide-react';
import { useMemo, useOptimistic, useTransition } from 'react';

type SchedulerInputProps = {
    schedule: TSlot[];
};

type TimeMap = {
    [key: string]: DaysOfTheWeek[];
};

/**
 * Load the schedule into a time map of the form:
 * {
 * '10:00': ['MON', 'TUE'],
 * '11:00': ['MON', 'TUE'],
 * ...
 * }
 * @param schedule The schedule to load, as an array of TSlot, being each slot of the shape {day: string, time: string, isSlot: boolean}
 */
const loadSchedule = (schedule: TSlot[]) => {
    const timeMap: TimeMap = {};
    schedule.forEach((slot) => {
        if (slot.isSlot === false) return;
        const previousArray = timeMap[`${slot.time}`] || [];
        previousArray.push(slot.day as DaysOfTheWeek);
        timeMap[`${slot.time}`] = previousArray;
    });
    return timeMap;
};

export function SchedulerInput({ schedule }: SchedulerInputProps) {
    console.log('rendering SchedulerInput');
    const scheduleHash = useMemo(() => loadSchedule(schedule), [schedule]);
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
        // isSlot checks whether our new time slot is already in the state
        const isSlot = newState[newTimeSlot.time].includes(
            newTimeSlot.day as DaysOfTheWeek
        );

        // Check if the time array of the new time slot exists
        const timeArrayExists = newState[newTimeSlot.time];

        // If is a slot -> filter it out
        if (isSlot) {
            newState[newTimeSlot.time] = newState[newTimeSlot.time].filter(
                (day) => day !== (newTimeSlot.day as DaysOfTheWeek)
            );
        }

        // is not a slot, but the time is in the state -> add the slot
        if (!isSlot && timeArrayExists) {
            newState[newTimeSlot.time].push(newTimeSlot.day as DaysOfTheWeek);
        }

        // If the time of the slot is not in the state -> we need to add the slot
        if (!isSlot && !timeArrayExists) {
            newState[newTimeSlot.time] = [newTimeSlot.day as DaysOfTheWeek];
        }

        optimisticallySetTimeMap(newState);
    };

    const OptimisticallyAddTimeArray = (time: string) => {
        const newState = deepCopy(optimisticTimeMap);
        newState[time] = ['MON' as DaysOfTheWeek];
        optimisticallySetTimeMap(newState);
    };

    const daysOfTheWeekNames = Object.keys(DaysOfTheWeek) as TDaysOfTheWeek[];
    const timeOfTheDayNames = Object.keys(TimeOfTheDay);
    const timeSlots = Object.keys(optimisticTimeMap);

    return (
        <table className='w-full'>
            {/* <div className='absolute right-5 bottom-5'>
                {JSON.stringify(optimisticTimeMap)}
            </div> */}
            {/* head */}

            <thead>
                <tr>
                    <th></th> {/* empty */}
                    {daysOfTheWeekNames.map((day, index) => (
                        <th key={index}>
                            {DaysOfTheWeek[day as TDaysOfTheWeek]}
                        </th>
                    ))}
                </tr>
            </thead>
            {/* body */}
            <tbody>
                {/* row */}
                {timeSlots.sort().map((time, index) => (
                    <tr key={index}>
                        <td>{time}</td>
                        {daysOfTheWeekNames.map((day, index) => (
                            <td key={index}>
                                <Input
                                    type='checkbox'
                                    checked={optimisticTimeMap[time].includes(
                                        day as DaysOfTheWeek
                                    )}
                                    onChange={() =>
                                        startTransition(() => {
                                            {
                                                optimisticallyToggleTimeSlot({
                                                    day,
                                                    time,
                                                    isSlot: !optimisticTimeMap[
                                                        time
                                                    ].includes(
                                                        day as DaysOfTheWeek
                                                    ),
                                                });
                                                toggleSlot(
                                                    time,
                                                    day,
                                                    '65f63a991f32a48594adeea6'
                                                );
                                            }
                                        })
                                    }
                                />
                            </td>
                        ))}
                    </tr>
                ))}

                <tr>
                    <td>
                        <Select
                            onValueChange={(value) => {
                                startTransition(() => {
                                    OptimisticallyAddTimeArray(
                                        TimeOfTheDay[value as TNameTimeOfDay]
                                    );
                                    addTimeArray(
                                        TimeOfTheDay[value as TNameTimeOfDay],
                                        '65f63a991f32a48594adeea6'
                                    );
                                });
                            }}
                        >
                            <SelectTrigger>Añadir</SelectTrigger>
                            <SelectContent>
                                <>
                                    {timeOfTheDayNames.map((time, index) => (
                                        <SelectItem key={index} value={time}>
                                            {
                                                TimeOfTheDay[
                                                    time as TNameTimeOfDay
                                                ]
                                            }
                                        </SelectItem>
                                    ))}
                                </>
                            </SelectContent>
                        </Select>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
