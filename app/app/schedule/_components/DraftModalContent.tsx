'use client';

import { Button } from '@/components/ui/button';
import { LucideLinkedin, PenSquare } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext } from 'react';
import { SchedulerContext } from './SchedulerProvider';
import { Separator } from '@/components/ui/separator';
import { schedulePost } from '@/app/_actions/schedule-actions';
import { Badge } from '@/components/ui/badge';

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

    const postsWithoutSchedule = userPosts.filter(
        (post) => post.scheduledPost.length === 0
    );

    const [hours, minutes] = time.split(':').map((t) => parseInt(t));

    return (
        <div className='relative w-full mx-auto overflow-hidden bg-white rounded-xl'>
            <div className='py-5'>
                <div className='flex items-center justify-between gap-6'>
                    <p className='text-lg font-semibold text-gray-900 '>
                        Elige un post
                    </p>
                </div>
            </div>
            <div>
                <div className='overflow-y-auto max-h-[80vh] lg:max-h-[80vh]'>
                    <div className='relative gap-4 columns-1 md:columns-2 sm:gap-6 first:mt-1'>
                        {postsWithoutSchedule.map((post, key) => {
                            return (
                                <div
                                    key={key}
                                    className='mb-[10px] overflow-hidden transition-all duration-150 bg-white border border-gray-200 shadow-xs rounded-xl hover:shadow-md hover:-translate-y-1'
                                >
                                    <div className='px-4 py-5 space-y-6 sm:p-6'>
                                        <p className='text-base font-normal text-gray-900 line-clamp-[10]'>
                                            {post?.content}
                                        </p>
                                        <Separator />
                                        {post.carousel.length === 0 && (
                                            <Badge className='ml-1'>
                                                Sin Carrusel
                                            </Badge>
                                        )}
                                        {post.carousel.length > 0 && (
                                            <Badge className='ml-1 bg-green-600'>
                                                Con carrusel
                                            </Badge>
                                        )}
                                        <Button
                                            className='w-full'
                                            onClick={() => {
                                                const scheduleDate = new Date(
                                                    date
                                                );
                                                scheduleDate.setHours(
                                                    hours,
                                                    minutes
                                                );
                                                schedulePost(
                                                    post.id,
                                                    data?.user.id!,
                                                    scheduleDate,
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
            <div className='relative w-full max-w-lg mx-auto overflow-hidden bg-white rounded-xl'>
                <div className=' overflow-y-auto max-h-[80vh] lg:max-h-[80vh]'>
                    <div className='space-y-6'>
                        <div className='relative w-64 h-64 mx-auto'>
                            <Image
                                className=''
                                src='https://app.supergrow.ai/static/media/connect-account.a567f7aa36bef73fd70b61324c0339c3.svg'
                                alt=''
                                fill
                            />
                        </div>
                        <div className='text-center'>
                            <p className='w-[full] mt-2 text-xl font-semibold text-gray-950'>
                                Conecta tu cuenta de Linkedin
                            </p>
                            <p className='max-w-sm mx-auto mt-2 text-base font-normal text-gray-600'>
                                Connecta to cuenta de Linkedin para programar y
                                publicar post.
                            </p>
                        </div>
                        <div className='flex flex-col gap-4 sm:justify-center sm:items-center sm:flex-row'>
                            <Button
                                onClick={() => {
                                    const promise = signIn('linkedin', {
                                        callbackUrl: '/app/schedule',
                                        onError: '/app/schedule?error=linkedin',
                                    });
                                }}
                                className='inline-flex items-center justify-center gap-2 transition-all duration-150 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-semibold hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 bg-blue-500 text-white'
                            >
                                <LucideLinkedin className='' size={18} />
                                Conectar cuenta
                            </Button>
                        </div>
                        <p className='max-w-sm mx-auto text-xs text-center text-gray-600'>
                            Se te redirigirá a Linkedin para que inicies sesión
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
