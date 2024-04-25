'use client';

import { format } from 'date-fns-tz';
import { CheckCircle, MoreHorizontal } from 'lucide-react';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parse } from 'date-fns';
import { DraftModalContent } from './DraftModalContent';
import { SchedulerContext } from './SchedulerProvider';
import { ViewMoreModalContent } from './ViewMoreModalContent';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { unschedulePost } from '@/app/_actions/schedule-actions';
import { deleteLinkedinPost } from '@/app/_actions/writter-actions';

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

    // console.log('date from postslot', date);
    // console.log('time from postslot', time);
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let now = new Date();
    let day = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} `; // e.g., 2024-4-22
    let dateString = day + time;
    console.log({ dateString });
    let dateObject = parse(dateString, 'yyyy-M-d hh:mm aa', new Date());
    console.log({ dateObject });
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    dateObject.setUTCHours(hours, minutes);
    console.log('after', { dateObject });
    const formattedTime = format(dateObject, 'KK:mm aa');

    const MenuWhenAvailable = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className='h-4 p-0 text-primary/50'
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
                `relative flex h-40 w-full flex-col rounded-md border border-dashed border-border bg-primary/5 p-2`,
                !isAvailable && 'bg-secondary',
                className
            )}
        >
            <div className='flex flex-wrap items-center justify-between p-2'>
                {isPublished && (
                    <div className='absolute -bottom-1 -right-1'>
                        <CheckCircle size={20} className='' />
                    </div>
                )}
                <p className='text-[12px]'>{formattedTime}</p>
                <div className='flex items-center justify-center gap-1'>
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
                <div className='flex grow items-center justify-center '>
                    <p className='text-sm italic text-primary/50'>Vacío</p>
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
