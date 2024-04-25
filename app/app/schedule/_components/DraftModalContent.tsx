'use client';

import { Edit2, LucideLinkedin, PenSquare } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { addMinutes, differenceInMinutes, parse } from 'date-fns';
import { difference } from 'next/dist/build/utils';
import { SchedulerContext } from './SchedulerProvider';
import { Separator } from '@/components/ui/separator';
import { schedulePost } from '@/app/_actions/schedule-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type DraftModalContentProps = {
    onSelect: () => void;
    time: string;
    date: Date;
};
export function DraftModalContent({
    onSelect,
    time,
    date,
}: DraftModalContentProps) {
    const { data } = useSession();

    return (
        <>
            {!data?.user.hasAccountLinked ? (
                <LinkedinConnectRequest />
            ) : (
                <PostSelect onSelect={onSelect} time={time} date={date} />
            )}
        </>
    );
}

export type PostSelectProps = {
    onSelect: () => void;
    time: string;
    date: Date;
};

export const PostSelect = ({ onSelect, time, date }: PostSelectProps) => {
    const { userPosts } = useContext(SchedulerContext);
    const { data } = useSession();
    const router = useRouter();

    const postsWithoutSchedule = userPosts.filter(
        (post) => post.scheduledPost.length === 0
    );

    return (
        <div className='relative mx-auto w-full overflow-hidden rounded-xl bg-white'>
            <div className='py-5'>
                <div className='flex items-center justify-between gap-6'>
                    <p className='text-lg font-semibold text-gray-900 '>
                        Elige un post
                    </p>
                </div>
            </div>
            <div>
                <div className='max-h-[80vh] overflow-y-auto lg:max-h-[80vh]'>
                    <div className='relative columns-1 gap-4 first:mt-1 sm:gap-6 md:columns-2'>
                        {postsWithoutSchedule.map((post, key) => {
                            return (
                                <div
                                    key={key}
                                    className='shadow-xs group relative mb-[10px] overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-150 hover:-translate-y-1 hover:shadow-md'
                                >
                                    <Button
                                        variant={'secondary'}
                                        size={'icon'}
                                        className='absolute right-2 top-2 hidden rounded-full group-hover:flex'
                                        onClick={() => {
                                            // edit the post
                                            router.push(
                                                `/app/post-writter/${post.id}`
                                            );
                                        }}
                                    >
                                        <Edit2 size={15} />
                                    </Button>
                                    <div className='space-y-6 px-4 py-5 sm:p-6'>
                                        <p className='line-clamp-[10] text-base font-normal text-gray-900'>
                                            {post?.content}
                                        </p>
                                        <Separator />
                                        {post?.carousel.length <= 0 && (
                                            <Badge className='ml-1'>
                                                Sin Carrusel
                                            </Badge>
                                        )}
                                        {post?.carousel.length > 0 &&
                                            !post?.carousel[0].pdfUrl && (
                                                <Badge className='ml-1 border-info bg-info-background text-info-foreground'>
                                                    Carrusel sin procesar
                                                </Badge>
                                            )}
                                        {!!post?.carousel[0]?.pdfUrl && (
                                            <Badge className='ml-1 border-success bg-success-background text-success'>
                                                Con carrusel
                                            </Badge>
                                        )}
                                        <Button
                                            className='w-full'
                                            onClick={() => {
                                                // We are trying to create a post at 01:45 AM, but the client is in UTC+2.

                                                console.log({ time }); // {time: '11:45 PM'} // of previous day!! We are using UTC here - so it's 23:45 UTC, but in the client it's 01:45 AM of the next day!!

                                                console.log({ date }); // 2024-04-25T00:00:00.000Z --> This is the date the user, not the UTC date

                                                // So when we do this...
                                                const scheduledDate = parse(
                                                    time,
                                                    'hh:mm aa',
                                                    date
                                                );
                                                // ...we are actually create a date in the date that the user selected, and with a time that is expected to be in the user's timezone, but it's actually in UTC. We need to correct both things the date and the time.

                                                // we corre the time by adding the offset to the time

                                                let correctTime = addMinutes(
                                                    // ... we need to add the offset to get the correct time in UTC
                                                    scheduledDate,
                                                    scheduledDate.getTimezoneOffset() *
                                                        -1
                                                );

                                                console.log(
                                                    scheduledDate.toISOString()
                                                ); // 2024-04-25T21:45:00.000Z

                                                // and we correct the date check if the time is in the previous UTC day
                                                const startOfUTCTomorrow =
                                                    new Date(
                                                        scheduledDate.getFullYear(),
                                                        scheduledDate.getMonth(),
                                                        scheduledDate.getDate() +
                                                            1
                                                    );
                                                const minutesDiff =
                                                    differenceInMinutes(
                                                        scheduledDate,
                                                        startOfUTCTomorrow
                                                    );

                                                // If the start of utc tomorrow is less than the offset... // to be continued, my head hurts
                                                const isNextDay =
                                                    minutesDiff >
                                                    scheduledDate.getTimezoneOffset();

                                                const nextDayOffset = isNextDay
                                                    ? 1 * 1440
                                                    : 0;

                                                correctTime = addMinutes(
                                                    // ... we need to add the offset to get the correct time in UTC
                                                    correctTime,
                                                    -nextDayOffset
                                                );

                                                schedulePost(
                                                    post.id,
                                                    data?.user.id!,
                                                    correctTime,
                                                    time
                                                );
                                                onSelect();
                                            }}
                                            variant={'outline'}
                                        >
                                            <PenSquare
                                                size={18}
                                                className='mr-2'
                                            />
                                            Seleccionar
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LinkedinConnectRequest = () => {
    return (
        <div>
            <div className='relative mx-auto w-full max-w-lg overflow-hidden rounded-xl bg-white'>
                <div className=' max-h-[80vh] overflow-y-auto lg:max-h-[80vh]'>
                    <div className='space-y-6'>
                        <div className='relative mx-auto h-64 w-64'>
                            <Image
                                className=''
                                src='https://app.supergrow.ai/static/media/connect-account.a567f7aa36bef73fd70b61324c0339c3.svg'
                                alt=''
                                fill
                            />
                        </div>
                        <div className='text-center'>
                            <p className='mt-2 w-[full] text-xl font-semibold text-gray-950'>
                                Conecta tu cuenta de Linkedin
                            </p>
                            <p className='mx-auto mt-2 max-w-sm text-base font-normal text-gray-600'>
                                Connecta to cuenta de Linkedin para programar y
                                publicar post.
                            </p>
                        </div>
                        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center'>
                            <Button
                                onClick={() => {
                                    const promise = signIn('linkedin', {
                                        // callbackUrl: '/app/schedule',
                                    });
                                }}
                                className='inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:px-4 sm:py-2.5'
                            >
                                <LucideLinkedin className='' size={18} />
                                Conectar cuenta
                            </Button>
                        </div>
                        <p className='mx-auto max-w-sm text-center text-xs text-gray-600'>
                            Se te redirigirá a Linkedin para que inicies sesión
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
