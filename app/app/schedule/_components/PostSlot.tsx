'use client';

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
import { MoreHorizontal } from 'lucide-react';
import { useContext, useState } from 'react';
import { DraftModalContent } from './DraftModalContent';
import { SchedulerContext } from './SchedulerProvider';
import { useRouter } from 'next/navigation';
import { unschedulePost } from '@/app/_actions/schedule-actions';
import { deleteLinkedinPost } from '@/app/_actions/writter-actions';
import { ViewMoreModalContent } from './ViewMoreModalContent';

type PostSlotProps = {
    isAvailable: boolean;
    postId: string;
    postContent: string;
    time: string;
    userProfileImageUrl: string | undefined;
    className?: string;
    date: Date;
};

export const PostSlot = ({
    isAvailable,
    postId,
    postContent,
    time,
    userProfileImageUrl,
    className,
    date,
}: PostSlotProps) => {
    const [draftDialogIsOpen, setdraftDialogIsOpen] = useState(false);
    const [viewMoreDialogIsOpen, setViewMoreDialogIsOpen] = useState(false);
    const { userPosts } = useContext(SchedulerContext);
    const router = useRouter();

    const MenuWhenAvailable = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className='text-primary/50 p-0'
                    variant={'ghost'}
                    size={'icon'}
                >
                    <MoreHorizontal size={20} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setdraftDialogIsOpen(true)}>
                    Añadir borrador
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        router.push(`/app/post-writter/new`);
                    }}
                >
                    Escribir post
                </DropdownMenuItem>
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
                `w-full h-40 bg-primary/5 rounded-md flex flex-col p-2 border border-dashed border-border`,
                !isAvailable && 'bg-primary/10'
            )}
        >
            <div className='flex justify-between flex-wrap items-center p-2'>
                <p className='text-[12px]'>{time}</p>
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
                <DialogContent>
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
