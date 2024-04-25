'use client';
import { SettingsIcon } from 'lucide-react';
import { MouseEventHandler, useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type FullScreenToolBarProps = {
    openFullScreen: MouseEventHandler<HTMLButtonElement>;
    closeFullscreen: MouseEventHandler<HTMLButtonElement>;
    className?: string;
};

export default function FullScreenToolBar({
    openFullScreen,
    closeFullscreen,
    className,
}: FullScreenToolBarProps) {
    return (
        <div
            className={cn(
                `group relative flex -translate-y-[4rem] flex-col
            items-center transition-transform duration-300 hover:translate-y-0`,
                className
            )}
        >
            <div className='flex h-16 w-full justify-between bg-muted'>
                <h3>This will be a thin toolbar</h3>
                <Button onClick={openFullScreen}>Full</Button>
                <Button onClick={closeFullscreen}>No Full</Button>
            </div>
            <div className='m-auto items-center  rounded-bl-lg rounded-br-lg bg-muted px-5 py-2'>
                <SettingsIcon className='m-auto transition-transform duration-500 group-hover:rotate-45' />
            </div>
        </div>
    );
}
