import {
    POST_CATEGORIES,
    VOICE_TONES,
} from '@/app/app/post-writter/config/const';
import { POST_TEMPLATES } from '@/app/app/post-writter/config/prompts';
import { DaysOfTheWeek } from '@/config/const';
import {
    DayMap,
    DayOfTheWeekNumber,
    Pure,
    TSlot,
    TimeMap,
} from '@/types/types';
import * as PrismaClient from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const verboseLog = (message: string, ...optionalParams: any[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(message, optionalParams);
    }
};

export const wait = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const range = (start: number, end: number, step = 1) => {
    let output = [];

    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    }

    for (let i = start; i < end; i += step) {
        output.push(i);
    }

    return output;
};

/**
 * Debounce function. When we call this function, it will return a new function that will have a timeout (closure). If the timeout is already set, it will clear it and set a new one, creating a "debounce" effect. The function has access to the timeout variable because of the closure: it was in its scope when the function was created.
 */
export function debouncedFunction<T extends (...args: any[]) => any>(
    func: T,
    waitFor: number
) {
    // This variable will hold the reference to the timeout
    let timeout: NodeJS.Timeout;

    // Return a new function that will debounce the execution of 'func'
    return (...args: Parameters<T>) => {
        // If 'timeout' is already set, clear it. This happens if the debounced
        // function is called again before the timeout has elapsed
        if (timeout) {
            clearTimeout(timeout);
        } else {
        }
        // create a new timeout
        timeout = setTimeout(() => {
            func(...args);
        }, waitFor);
    };
}

export const deepCopy = <T>(obj: T) => {
    return JSON.parse(JSON.stringify(obj)) as T;
};

export function isEven(n: number) {
    return n % 2 == 0;
}

export const getPostTemplateById = (id: string) => {
    const template = POST_TEMPLATES.find((template) => template.id === id);

    if (!template) {
        throw new Error(`Template with id ${id} not found`);
    }

    return template;
};

export const getAllPostTemplates = () => {
    const template = POST_TEMPLATES;

    return template;
};

export const getAllPostCategories = () => {
    const categories = POST_CATEGORIES;

    return categories;
};

export const getVoiceToneById = (id: number) => {
    const tone = VOICE_TONES.find((tone) => tone.id === id);

    if (!tone) {
        throw new Error(`Tone with id ${id} not found`);
    }

    return tone;
};

export const capitalizeFirstLetter = (string: string) => {
    const newString = string.toLowerCase();
    return newString.charAt(0).toUpperCase() + newString.slice(1);
};

export const uploadFileToCloudinary = async (file: File) => {};

/**
 * Retry an async function a number of times with a delay between each attempt.
 */
export async function retryAsyncFunction<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 1000
): Promise<T> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            console.error(
                `Attempt ${attempt} failed: ${(error as Error).message}`
            );
            if (attempt < maxAttempts) {
                console.log(`Waiting ${delayMs}ms before retrying...`);
                await wait(delayMs);
            } else {
                throw error; // Rethrow error after last attempt
            }
        }
    }

    // This line is technically unreachable due to the throw in the catch block,
    // but TypeScript doesn't know that we're always throwing inside the loop on the last attempt
    throw new Error('This should never happen');
}

/**
 * Load the schedule into a time map of the form:
 * {
 * '10:00': [0, 1],
 * '11:00': [3, 6],
 * ...
 * }
 * @param schedule The schedule to load, as an array of TSlots
 */
export const loadWeekdaysPerTime = (schedule: TSlot[]) => {
    const timeMap: TimeMap = {};
    schedule.forEach((slot) => {
        const previousArray = timeMap[`${slot.time}`] || [];
        previousArray.push(slot.dayOfTheWeek as DayOfTheWeekNumber);
        timeMap[`${slot.time}`] = previousArray;
    });
    return timeMap;
};

/**
 * Load the schedule into a day map of the form:
 * {
 * 'monday': ['10:00', '11:00'],
 * 'tuesday': ['10:00', '11:00'],
 * ...
 * }
 */
export const loadSchedulePerDay = (schedule: TSlot[]) => {
    const dayMap: DayMap = {};
    schedule.forEach((slot) => {
        dayMap[slot.dayOfTheWeek] && dayMap[slot.dayOfTheWeek].length > 0
            ? dayMap[slot.dayOfTheWeek].push(slot.time)
            : (dayMap[slot.dayOfTheWeek] = [slot.time]);
    });
    return dayMap;
};

export const fromPdfUrlToThumnailUrl = (
    pdfId: string,
    page: number
    // width = 200,
    // height = 250
) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,pg_${page}/${pdfId}.jpg`;
    // return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill,pg_${page}/${pdfId}.jpg`;
};
