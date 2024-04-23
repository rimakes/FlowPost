'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { format, fromZonedTime, toZonedTime } from 'date-fns-tz';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { CheckCircle, MoreHorizontal } from 'lucide-react';
import { useContext, useState } from 'react';
import { DraftModalContent } from './DraftModalContent';
import { SchedulerContext } from './SchedulerProvider';
import { useRouter } from 'next/navigation';
import { unschedulePost } from '@/app/_actions/schedule-actions';
import { deleteLinkedinPost } from '@/app/_actions/writter-actions';
import { ViewMoreModalContent } from './ViewMoreModalContent';
import { parse } from 'date-fns';

type PostSlotProps = {
    isAvailable: boolean;
    postId: string;
    postContent: string;
    time: string;
    userProfileImageUrl: string | undefined;
    className?: string;
    date: Date;
    isPublished?: boolean;
};

export const PostSlot = ({
    isAvailable,
    postId,
    postContent,
    time,
    userProfileImageUrl,
    className,
    isPublished,
    date,
}: PostSlotProps) => {
    const [draftDialogIsOpen, setdraftDialogIsOpen] = useState(false);
    const [viewMoreDialogIsOpen, setViewMoreDialogIsOpen] = useState(false);
    const { userPosts } = useContext(SchedulerContext);
    const router = useRouter();

    // time is in UTC, we need it in the user's timezone

    console.log('date from postslot', date);
    console.log('time from postslot', time);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let now = new Date();
    let day = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} `; // e.g., 2024-4-22
    let dateString = day + time;
    let dateObject = parse(dateString, 'yyyy-M-d hh:mm aa', new Date());
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    dateObject.setUTCHours(hours, minutes);
    const formattedTime = format(dateObject, 'KK:mm aa');

    const MenuWhenAvailable = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className='text-primary/50 p-0 h-4'
                    variant={'ghost'}
                    size={'icon'}
                >
                    <MoreHorizontal size={20} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setdraftDialogIsOpen(true)}>
                    Programar post
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                    onClick={() => {
                        router.push(`/app/post-writter/new`);
                    }}
                >
                    Escribir post
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );

    const MenuWhenNotAvailable = () => (
        <DropdownMenu>
            <DropdownMenuTrigger className='text-primary/50'>
                <MoreHorizontal size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => {
                        setViewMoreDialogIsOpen(true);
                    }}
                >
                    Ver
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        router.push(`/app/post-writter/${postId}`);
                    }}
                >
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        unschedulePost(postId);
                    }}
                >
                    Desprogramar
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        deleteLinkedinPost(postId);
                    }}
                >
                    Borrar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <div
            className={cn(
                `w-full h-40 bg-primary/5 rounded-md flex flex-col p-2 border border-dashed border-border relative`,
                !isAvailable && 'bg-secondary',
                className
            )}
        >
            <div className='flex justify-between flex-wrap items-center p-2'>
                {isPublished && (
                    <div className='absolute -bottom-1 -right-1'>
                        <CheckCircle size={20} className='' />
                    </div>
                )}
                <p className='text-[12px]'>{formattedTime}</p>
                <div className='flex gap-1 justify-center items-center'>
                    <Avatar className='h-4 w-4'>
                        <AvatarImage src={userProfileImageUrl} alt='avatar' />
                        {/* <AvatarFallback className='text-[10px]'>
                            RS
                        </AvatarFallback> */}
                    </Avatar>
                    {isAvailable ? (
                        <MenuWhenAvailable />
                    ) : (
                        <MenuWhenNotAvailable />
                    )}
                </div>
            </div>
            {isAvailable ? (
                <div className='flex justify-center items-center grow '>
                    <p className='italic text-primary/50 text-sm'>Vacío</p>
                </div>
            ) : (
                <div className=' line-clamp-4'>
                    <p>{postContent}</p>
                </div>
            )}

            <Dialog
                open={draftDialogIsOpen}
                onOpenChange={(isOpen) => setdraftDialogIsOpen(isOpen)}
            >
                <DialogContent className='bg-white'>
                    <DraftModalContent
                        date={date}
                        time={time}
                        onSelect={() => setdraftDialogIsOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            <Dialog
                open={viewMoreDialogIsOpen}
                onOpenChange={(isOpen) => setViewMoreDialogIsOpen(isOpen)}
            >
                <DialogContent>
                    <ViewMoreModalContent
                        post={userPosts.find((post) => post.id === postId)!}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
